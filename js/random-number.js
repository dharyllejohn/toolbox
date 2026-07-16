const result=document.getElementById("result");

document.getElementById("generateBtn").onclick=()=>{

let min=parseInt(document.getElementById("min").value);

let max=parseInt(document.getElementById("max").value);

if(min>max){

[min,max]=[max,min];

}

result.value=Math.floor(Math.random()*(max-min+1))+min;

};

document.getElementById("copyBtn").onclick=async()=>{

if(!result.value) return;

await navigator.clipboard.writeText(result.value);

alert("Copied!");

};