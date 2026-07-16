const card=document.getElementById("card");
const title=document.getElementById("title");
const description=document.getElementById("description");
const image=document.getElementById("image");
const url=document.getElementById("url");
const site=document.getElementById("site");

const output=document.getElementById("output");

document.getElementById("generateBtn").onclick=()=>{

output.value=
`<meta name="twitter:card" content="${card.value}">
<meta name="twitter:title" content="${title.value}">
<meta name="twitter:description" content="${description.value}">
<meta name="twitter:image" content="${image.value}">
<meta name="twitter:url" content="${url.value}">
<meta name="twitter:site" content="${site.value}">`;

};

document.getElementById("copyBtn").onclick=()=>{

navigator.clipboard.writeText(output.value);

};

document.getElementById("clearBtn").onclick=()=>{

card.value="summary";
title.value="";
description.value="";
image.value="";
url.value="";
site.value="";
output.value="";

};