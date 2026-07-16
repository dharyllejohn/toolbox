const encoder = new TextEncoder();

async function sha256(message){

const data = encoder.encode(message);

const hash = await crypto.subtle.digest("SHA-256", data);

return Array.from(new Uint8Array(hash))
.map(b=>b.toString(16).padStart(2,"0"))
.join("");

}

document.getElementById("generateBtn").onclick=async()=>{

const text=document.getElementById("text").value;

if(!text) return;

document.getElementById("output").value=await sha256(text);

};

document.getElementById("copyBtn").onclick=async()=>{

const output=document.getElementById("output");

if(!output.value) return;

await navigator.clipboard.writeText(output.value);

alert("Copied!");

};