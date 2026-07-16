document.getElementById("convertBtn").onclick=()=>{

const ts=parseInt(document.getElementById("timestamp").value);

if(isNaN(ts)) return;

const date=new Date(ts*1000);

document.getElementById("result").value=date.toLocaleString();

};

document.getElementById("copyBtn").onclick=async()=>{

const result=document.getElementById("result");

if(!result.value) return;

await navigator.clipboard.writeText(result.value);

alert("Copied!");

};