const input=document.getElementById("text");
const output=document.getElementById("output");

document.getElementById("encodeBtn").onclick=()=>{

output.value=encodeURIComponent(input.value);

};

document.getElementById("decodeBtn").onclick=()=>{

try{

output.value=decodeURIComponent(input.value);

}catch{

alert("Invalid encoded URL.");

}

};

document.getElementById("copyBtn").onclick=async()=>{

if(!output.value) return;

await navigator.clipboard.writeText(output.value);

alert("Copied!");

};