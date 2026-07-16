const pdfFile=document.getElementById("pdfFile");
const rotation=document.getElementById("rotation");

const rotateBtn=document.getElementById("rotateBtn");
const downloadBtn=document.getElementById("downloadBtn");

let rotatedPdf=null;

rotateBtn.addEventListener("click",async()=>{

if(!pdfFile.files.length){

alert("Please select a PDF.");

return;

}

const bytes=await pdfFile.files[0].arrayBuffer();

const pdf=await PDFLib.PDFDocument.load(bytes);

const pages=pdf.getPages();

pages.forEach(page=>{

page.setRotation(PDFLib.degrees(Number(rotation.value)));

});

rotatedPdf=await pdf.save();

downloadBtn.style.display="inline-block";

alert("PDF rotated successfully.");

});

downloadBtn.addEventListener("click",()=>{

if(!rotatedPdf)return;

const blob=new Blob([rotatedPdf],{

type:"application/pdf"

});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="rotated.pdf";

a.click();

URL.revokeObjectURL(url);

});