const pdfFile=document.getElementById("pdfFile");
const position=document.getElementById("position");
const fontSize=document.getElementById("fontSize");
const sizeValue=document.getElementById("sizeValue");

const generateBtn=document.getElementById("generateBtn");
const downloadBtn=document.getElementById("downloadBtn");

let pdfBytes=null;

fontSize.oninput=()=>{

sizeValue.textContent=fontSize.value+" px";

};

generateBtn.onclick=async()=>{

if(!pdfFile.files.length){

alert("Select a PDF.");

return;

}

const bytes=await pdfFile.files[0].arrayBuffer();

const pdf=await PDFLib.PDFDocument.load(bytes);

const pages=pdf.getPages();

const total=pages.length;

pages.forEach((page,index)=>{

const {width,height}=page.getSize();

const text=`Page ${index+1} of ${total}`;

let x=0;
let y=0;

switch(position.value){

case "bottom-center":
x=width/2-40;
y=20;
break;

case "bottom-right":
x=width-90;
y=20;
break;

case "bottom-left":
x=20;
y=20;
break;

case "top-center":
x=width/2-40;
y=height-30;
break;

case "top-right":
x=width-90;
y=height-30;
break;

case "top-left":
x=20;
y=height-30;
break;

}

page.drawText(text,{

x,
y,
size:Number(fontSize.value)

});

});

pdfBytes=await pdf.save();

downloadBtn.style.display="inline-block";

alert("Page numbers added.");

};

downloadBtn.onclick=()=>{

if(!pdfBytes)return;

const blob=new Blob([pdfBytes],{

type:"application/pdf"

});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="page-numbered.pdf";

a.click();

URL.revokeObjectURL(url);

};