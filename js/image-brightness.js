const input=document.getElementById("imageInput");
const bright=document.getElementById("brightness");
const contrast=document.getElementById("contrast");
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const download=document.getElementById("downloadBtn");

let img=new Image();

input.onchange=e=>{

const file=e.target.files[0];
if(!file)return;

img.src=URL.createObjectURL(file);
img.onload=draw;

};

bright.oninput=draw;
contrast.oninput=draw;

function draw(){

if(!img.src)return;

canvas.width=img.width;
canvas.height=img.height;

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.filter=`brightness(${bright.value}%) contrast(${contrast.value}%)`;

ctx.drawImage(img,0,0);

ctx.filter="none";

}

download.onclick=()=>{

const a=document.createElement("a");
a.href=canvas.toDataURL("image/png");
a.download="edited-image.png";
a.click();

};