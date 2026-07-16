const pdfFile=document.getElementById("pdfFile");
const pagesInput=document.getElementById("pages");

const splitBtn=document.getElementById("splitBtn");
const downloadBtn=document.getElementById("downloadBtn");

let pdfBytes=null;

function parsePages(str){

const result=[];

str.split(",").forEach(part=>{

part=part.trim();

if(part.includes("-")){

let [start,end]=part.split("-").map(Number);

for(let i=start;i<=end;i++){

result.push(i-1);

}

}else{

result.push(Number(part)-1);

}

});

return [...new Set(result)];

}

splitBtn.addEventListener("click",async()=>{

if(!pdfFile.files.length){

alert("Select a PDF.");

return;

}

const bytes=await pdfFile.files[0].arrayBuffer();

const src=await PDFLib.PDFDocument.load(bytes);

const out=await PDFLib.PDFDocument.create();

const pages=parsePages(pagesInput.value);

const validPages=pages.filter(i=>i>=0&&i<src.getPageCount());

const copied=await out.copyPages(src,validPages);

copied.forEach(page=>out.addPage(page));

pdfBytes=await out.save();

downloadBtn.style.display="inline-block";

alert("PDF ready!");

});

downloadBtn.addEventListener("click",()=>{

if(!pdfBytes)return;

const blob=new Blob([pdfBytes],{

type:"application/pdf"

});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="split.pdf";

a.click();

URL.revokeObjectURL(url);

});