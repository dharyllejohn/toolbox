const input=document.getElementById("imageInput");
const blur=document.getElementById("blur");
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const download=document.getElementById("downloadBtn");

let img=new Image();

input.onchange=e=>{

const file=e.target.files[0];
if(!file) return;

img.src=URL.createObjectURL(file);

img.onload=draw;

};

blur.oninput=draw;

function draw(){

if(!img.src) return;

canvas.width=img.width;
canvas.height=img.height;

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.filter=`blur(${blur.value}px)`;

ctx.drawImage(img,0,0);

ctx.filter="none";

}

download.onclick=()=>{

const a=document.createElement("a");
a.href=canvas.toDataURL("image/png");
a.download="blur-image.png";
a.click();

};