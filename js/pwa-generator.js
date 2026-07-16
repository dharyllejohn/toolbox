const name=document.getElementById("name");
const shortName=document.getElementById("shortName");
const description=document.getElementById("description");
const themeColor=document.getElementById("themeColor");
const backgroundColor=document.getElementById("backgroundColor");
const startUrl=document.getElementById("startUrl");
const display=document.getElementById("display");

const output=document.getElementById("output");

document.getElementById("generateBtn").onclick=()=>{

const manifest={

name:name.value,

short_name:shortName.value,

description:description.value,

start_url:startUrl.value,

display:display.value,

background_color:backgroundColor.value,

theme_color:themeColor.value,

orientation:"portrait",

icons:[

{

src:"icon-192.png",

sizes:"192x192",

type:"image/png"

},

{

src:"icon-512.png",

sizes:"512x512",

type:"image/png"

}

]

};

output.value=JSON.stringify(manifest,null,2);

};

document.getElementById("copyBtn").onclick=()=>{

if(!output.value)return;

navigator.clipboard.writeText(output.value);

};

document.getElementById("downloadBtn").onclick=()=>{

if(!output.value)return;

const blob=new Blob([output.value],{type:"application/json"});

const url=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="manifest.json";

a.click();

URL.revokeObjectURL(url);

};

document.getElementById("clearBtn").onclick=()=>{

name.value="";
shortName.value="";
description.value="";
themeColor.value="#4f46e5";
backgroundColor.value="#ffffff";
startUrl.value="/";
display.value="standalone";
output.value="";

};