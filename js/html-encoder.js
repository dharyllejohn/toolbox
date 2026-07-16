const input=document.getElementById("input");
const output=document.getElementById("output");

document.getElementById("encodeBtn").onclick=()=>{

const div=document.createElement("div");
div.innerText=input.value;
output.value=div.innerHTML;

};

document.getElementById("copyBtn").onclick=()=>{
navigator.clipboard.writeText(output.value);
};