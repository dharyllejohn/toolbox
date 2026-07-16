const pdfFile=document.getElementById("pdfFile");
const order=document.getElementById("order");
const pageInfo=document.getElementById("pageInfo");

const organizeBtn=document.getElementById("organizeBtn");
const downloadBtn=document.getElementById("downloadBtn");

let pdfBytes=null;
let sourcePdf=null;

pdfFile.addEventListener("change",async()=>{

if(!pdfFile.files.length)return;

const bytes=await pdfFile.files[0].arrayBuffer();

sourcePdf=await PDFLib.PDFDocument.load(bytes);

pageInfo.innerHTML=
`<p><strong>Total Pages:</strong> ${sourcePdf.getPageCount()}</p>`;

});

organizeBtn.onclick=async()=>{

if(!sourcePdf){

alert("Please select a PDF.");

return;

}

const total=sourcePdf.getPageCount();

const pages=order.value
.split(",")
.map(n=>parseInt(n.trim())-1)
.filter(n=>!isNaN(n));

if(pages.length===0){

alert("Enter page order.");

return;

}

for(const p of pages){

if(p<0||p>=total){

alert("Invalid page number.");

return;

}

}

const newPdf=await PDFLib.PDFDocument.create();

const copied=await newPdf.copyPages(sourcePdf,pages);

copied.forEach(page=>newPdf.addPage(page));

pdfBytes=await newPdf.save();

downloadBtn.style.display="inline-block";

alert("PDF organized successfully.");

};

downloadBtn.onclick=()=>{

const blob=new Blob([pdfBytes],{

type:"application/pdf"

});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="organized.pdf";

a.click();

URL.revokeObjectURL(url);

};