const input=document.getElementById("imageInput");
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

input.addEventListener("change",()=>{

const file=input.files[0];

if(!file)return;

const img=new Image();

img.onload=()=>{

ctx.clearRect(0,0,64,64);

ctx.drawImage(img,0,0,64,64);

};

img.src=URL.createObjectURL(file);

});

document.getElementById("downloadBtn").onclick=()=>{

const link=document.createElement("a");

link.download="favicon.png";

link.href=canvas.toDataURL("image/png");

link.click();

};

document.getElementById("clearBtn").onclick=()=>{

ctx.clearRect(0,0,64,64);

input.value="";

};