const output=document.getElementById("output");

document.getElementById("generateBtn").onclick=()=>{

output.value=`<title>${title.value}</title>

<meta name="description" content="${description.value}">
<meta name="keywords" content="${keywords.value}">
<meta name="author" content="${author.value}">`;

};

document.getElementById("copyBtn").onclick=()=>{
navigator.clipboard.writeText(output.value);
};