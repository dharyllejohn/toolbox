const pdfInput=document.getElementById("pdfFiles");
const fileList=document.getElementById("fileList");
const mergeBtn=document.getElementById("mergeBtn");
const downloadBtn=document.getElementById("downloadBtn");

let mergedBytes=null;

pdfInput.addEventListener("change",()=>{

fileList.innerHTML="";

[...pdfInput.files].forEach(file=>{

const div=document.createElement("div");

div.textContent="📄 "+file.name;

div.style.margin="8px 0";

fileList.appendChild(div);

});

});

mergeBtn.addEventListener("click",async()=>{

if(pdfInput.files.length<2){

alert("Please select at least 2 PDF files.");

return;

}

const mergedPdf=await PDFLib.PDFDocument.create();

for(const file of pdfInput.files){

const bytes=await file.arrayBuffer();

const pdf=await PDFLib.PDFDocument.load(bytes);

const pages=await mergedPdf.copyPages(pdf,pdf.getPageIndices());

pages.forEach(page=>mergedPdf.addPage(page));

}

mergedBytes=await mergedPdf.save();

downloadBtn.style.display="inline-block";

alert("PDF merged successfully!");

});

downloadBtn.addEventListener("click",()=>{

if(!mergedBytes)return;

const blob=new Blob([mergedBytes],{

type:"application/pdf"

});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="merged.pdf";

a.click();

URL.revokeObjectURL(url);

});