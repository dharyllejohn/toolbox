const images=document.getElementById("images");
const preview=document.getElementById("preview");

const convertBtn=document.getElementById("convertBtn");
const downloadBtn=document.getElementById("downloadBtn");

let pdfBlob=null;

images.addEventListener("change",()=>{

preview.innerHTML="";

[...images.files].forEach(file=>{

const img=document.createElement("img");

img.src=URL.createObjectURL(file);

img.style.width="100%";
img.style.height="120px";
img.style.objectFit="cover";
img.style.borderRadius="10px";

preview.appendChild(img);

});

});

convertBtn.addEventListener("click",async()=>{

if(images.files.length===0){

alert("Select images first.");

return;

}

const {jsPDF}=window.jspdf;

const pdf=new jsPDF();

for(let i=0;i<images.files.length;i++){

const file=images.files[i];

const data=await new Promise(resolve=>{

const reader=new FileReader();

reader.onload=e=>resolve(e.target.result);

reader.readAsDataURL(file);

});

if(i>0){

pdf.addPage();

}

pdf.addImage(data,"JPEG",15,15,180,260);

}

pdfBlob=pdf.output("blob");

downloadBtn.style.display="inline-block";

alert("PDF created successfully.");

});

downloadBtn.addEventListener("click",()=>{

if(!pdfBlob)return;

const url=URL.createObjectURL(pdfBlob);

const a=document.createElement("a");

a.href=url;

a.download="images.pdf";

a.click();

URL.revokeObjectURL(url);

});