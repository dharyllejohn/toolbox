const columns=document.getElementById("columns");
const rows=document.getElementById("rows");
const gap=document.getElementById("gap");

const preview=document.getElementById("preview");
const output=document.getElementById("output");

function generate(){

preview.style.gridTemplateColumns=`repeat(${columns.value},1fr)`;
preview.style.gridTemplateRows=`repeat(${rows.value},80px)`;
preview.style.gap=`${gap.value}px`;

preview.innerHTML="";

const total=columns.value*rows.value;

for(let i=1;i<=total;i++){

const box=document.createElement("div");

box.textContent=i;

box.style.background="#4f46e5";
box.style.color="#fff";
box.style.display="flex";
box.style.alignItems="center";
box.style.justifyContent="center";
box.style.borderRadius="8px";
box.style.fontWeight="bold";

preview.appendChild(box);

}

output.value=
`display: grid;
grid-template-columns: repeat(${columns.value}, 1fr);
grid-template-rows: repeat(${rows.value}, 80px);
gap: ${gap.value}px;`;

}

columns.oninput=generate;
rows.oninput=generate;
gap.oninput=generate;

generate();

document.getElementById("copyBtn").onclick=()=>{

navigator.clipboard.writeText(output.value);

const btn=document.getElementById("copyBtn");

btn.textContent="✅ Copied";

setTimeout(()=>{

btn.textContent="📋 Copy CSS";

},1500);

};

document.getElementById("resetBtn").onclick=()=>{

columns.value=3;
rows.value=2;
gap.value=10;

generate();

};