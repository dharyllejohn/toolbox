const input=document.getElementById("imageInput");
const filter=document.getElementById("filter");
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

filter.onchange=draw;

function draw(){

if(!img.src)return;

canvas.width=img.width;
canvas.height=img.height;

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.filter=filter.value;

ctx.drawImage(img,0,0);

ctx.filter="none";

}

download.onclick=()=>{

const a=document.createElement("a");
a.href=canvas.toDataURL("image/png");
a.download="filtered-image.png";
a.click();

};