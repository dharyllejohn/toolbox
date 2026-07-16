const input=document.getElementById("input");
const output=document.getElementById("output");

document.getElementById("minifyBtn").onclick=()=>{

let code=input.value;

if(!code.trim()){

output.value="";
return;

}

// Remove block comments
code=code.replace(/\/\*[\s\S]*?\*\//g,"");

// Remove line comments
code=code.replace(/\/\/.*$/gm,"");

// Remove blank lines
code=code.replace(/^\s*[\r\n]/gm,"");

// Collapse whitespace
code=code.replace(/\s+/g," ");

// Remove spaces around symbols
code=code.replace(/\s*([{}();,:=+\-*/<>])\s*/g,"$1");

output.value=code.trim();

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

document.getElementById("clearBtn").onclick=()=>{

input.value="";
output.value="";

};