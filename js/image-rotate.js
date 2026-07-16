const input=document.getElementById("imageInput");
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const angle=document.getElementById("angle");
const download=document.getElementById("downloadBtn");

let img=new Image();

input.onchange=e=>{

const file=e.target.files[0];
if(!file) return;

img.src=URL.createObjectURL(file);

img.onload=draw;

};

angle.oninput=draw;

function draw(){

if(!img.src) return;

const rad=angle.value*Math.PI/180;

const sin=Math.abs(Math.sin(rad));
const cos=Math.abs(Math.cos(rad));

canvas.width=img.width*cos+img.height*sin;
canvas.height=img.width*sin+img.height*cos;

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.save();

ctx.translate(canvas.width/2,canvas.height/2);
ctx.rotate(rad);

ctx.drawImage(img,-img.width/2,-img.height/2);

ctx.restore();

}

download.onclick=()=>{

const a=document.createElement("a");

a.href=canvas.toDataURL("image/png");

a.download="rotated.png";

a.click();

};