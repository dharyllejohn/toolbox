const text=document.getElementById("text");
const minLength=document.getElementById("minLength");
const output=document.getElementById("output");

document.getElementById("analyzeBtn").onclick=()=>{

let words=text.value
.toLowerCase()
.replace(/[^\w\s]/g,"")
.split(/\s+/)
.filter(word=>word.length>=parseInt(minLength.value));

if(words.length===0){

output.value="No words found.";

return;

}

let count={};

words.forEach(word=>{

count[word]=(count[word]||0)+1;

});

let sorted=Object.entries(count).sort((a,b)=>b[1]-a[1]);

let result=`Total Words : ${words.length}\n\n`;

result+="Keyword\tCount\tDensity\n";
result+="---------------------------------\n";

sorted.forEach(item=>{

let density=((item[1]/words.length)*100).toFixed(2);

result+=`${item[0]}\t${item[1]}\t${density}%\n`;

});

output.value=result;

};

document.getElementById("copyBtn").onclick=()=>{

navigator.clipboard.writeText(output.value);

};

document.getElementById("clearBtn").onclick=()=>{

text.value="";
output.value="";
minLength.value=3;

};