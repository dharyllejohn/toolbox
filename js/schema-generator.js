const type=document.getElementById("type");
const name=document.getElementById("name");
const url=document.getElementById("url");
const logo=document.getElementById("logo");
const description=document.getElementById("description");
const output=document.getElementById("output");

document.getElementById("generateBtn").onclick=()=>{

const schema={

"@context":"https://schema.org",

"@type":type.value,

"name":name.value,

"url":url.value,

"description":description.value

};

if(logo.value.trim()!==""){

schema.logo=logo.value;
schema.image=logo.value;

}

output.value=JSON.stringify(schema,null,2);

};

document.getElementById("copyBtn").onclick=()=>{

if(!output.value)return;

navigator.clipboard.writeText(output.value);

const btn=document.getElementById("copyBtn");

btn.textContent="✅ Copied";

setTimeout(()=>{

btn.textContent="📋 Copy";

},1500);

};

document.getElementById("downloadBtn").onclick=()=>{

if(!output.value)return;

const blob=new Blob([output.value],{

type:"application/ld+json"

});

const urlObj=URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=urlObj;
a.download="schema.json";

a.click();

URL.revokeObjectURL(urlObj);

};

document.getElementById("clearBtn").onclick=()=>{

type.value="Organization";
name.value="";
url.value="";
logo.value="";
description.value="";
output.value="";

};