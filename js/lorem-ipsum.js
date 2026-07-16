const lorem =
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

document.getElementById("generateBtn").onclick=()=>{

let count=parseInt(document.getElementById("count").value)||1;

let text=[];

for(let i=0;i<count;i++){

text.push(lorem);

}

document.getElementById("output").value=text.join("\n\n");

};

document.getElementById("copyBtn").onclick=async()=>{

const output=document.getElementById("output");

if(!output.value) return;

await navigator.clipboard.writeText(output.value);

alert("Copied!");

};