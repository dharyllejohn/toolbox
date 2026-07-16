const input=document.getElementById("input");
const output=document.getElementById("output");

document.getElementById("generateBtn").onclick=()=>{

output.value=input.value
.toLowerCase()
.trim()
.replace(/[^\w\s-]/g,"")
.replace(/\s+/g,"-")
.replace(/-+/g,"-");

};

document.getElementById("copyBtn").onclick=()=>{
navigator.clipboard.writeText(output.value);
};