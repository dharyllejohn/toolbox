const input=document.getElementById("imageInput");
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

const colorBox=document.getElementById("colorBox");
const output=document.getElementById("output");
const copy=document.getElementById("copyBtn");

input.onchange=e=>{

const file=e.target.files[0];
if(!file)return;

const img=new Image();

img.src=URL.createObjectURL(file);

img.onload=()=>{

canvas.width=img.width;
canvas.height=img.height;

ctx.drawImage(img,0,0);

const data=ctx.getImageData(0,0,img.width,img.height).data;

let r=0,g=0,b=0,count=0;

for(let i=0;i<data.length;i+=40){

r+=data[i];
g+=data[i+1];
b+=data[i+2];
count++;

}

r=Math.round(r/count);
g=Math.round(g/count);
b=Math.round(b/count);

const hex="#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);

colorBox.style.background=hex;
output.value=hex;

};

};

copy.onclick=()=>{

navigator.clipboard.writeText(output.value);

alert("HEX copied!");

};