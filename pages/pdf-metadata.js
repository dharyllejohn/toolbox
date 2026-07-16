const pdfFile=document.getElementById("pdfFile");

const title=document.getElementById("title");
const author=document.getElementById("author");
const subject=document.getElementById("subject");
const keywords=document.getElementById("keywords");
const creator=document.getElementById("creator");

const saveBtn=document.getElementById("saveBtn");
const downloadBtn=document.getElementById("downloadBtn");

let pdfBytes=null;

saveBtn.onclick=async()=>{

if(!pdfFile.files.length){

alert("Select a PDF.");

return;

}

const bytes=await pdfFile.files[0].arrayBuffer();

const pdf=await PDFLib.PDFDocument.load(bytes);

if(title.value.trim())
pdf.setTitle(title.value);

if(author.value.trim())
pdf.setAuthor(author.value);

if(subject.value.trim())
pdf.setSubject(subject.value);

if(keywords.value.trim()){

pdf.setKeywords(

keywords.value
.split(",")
.map(k=>k.trim())

);

}

if(creator.value.trim())
pdf.setCreator(creator.value);

pdf.setProducer("ToolBox Pro");

pdf.setModificationDate(new Date());

pdfBytes=await pdf.save();

downloadBtn.style.display="inline-block";

alert("Metadata updated successfully.");

};

downloadBtn.onclick=()=>{

if(!pdfBytes)return;

const blob=new Blob([pdfBytes],{

type:"application/pdf"

});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="metadata.pdf";

a.click();

URL.revokeObjectURL(url);

};