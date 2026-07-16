const input=document.getElementById("imageInput");
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

const flipH=document.getElementById("flipH");
const flipV=document.getElementById("flipV");
const download=document.getElementById("downloadBtn");

let img=new Image();
let scaleX=1;
let scaleY=1;

input.onchange=e=>{

const file=e.target.files[0];
if(!file) return;

img.src=URL.createObjectURL(file);

img.onload=draw;

};

function draw(){

canvas.width=img.width;
canvas.height=img.height;

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.save();

ctx.translate(scaleX==-1?canvas.width:0,scaleY==-1?canvas.height:0);

ctx.scale(scaleX,scaleY);

ctx.drawImage(img,0,0);

ctx.restore();

}

flipH.onclick=()=>{

scaleX*=-1;
draw();

};

flipV.onclick=()=>{

scaleY*=-1;
draw();

};

download.onclick=()=>{

const a=document.createElement("a");

a.href=canvas.toDataURL("image/png");

a.download="flipped.png";

a.click();

};