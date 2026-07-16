const direction=document.getElementById("direction");
const justify=document.getElementById("justify");
const align=document.getElementById("align");

const preview=document.getElementById("preview");
const output=document.getElementById("output");

function generate(){

preview.style.display="flex";
preview.style.flexDirection=direction.value;
preview.style.justifyContent=justify.value;
preview.style.alignItems=align.value;

output.value=
`display: flex;
flex-direction: ${direction.value};
justify-content: ${justify.value};
align-items: ${align.value};`;

}

direction.onchange=generate;
justify.onchange=generate;
align.onchange=generate;

generate();

document.getElementById("copyBtn").onclick=()=>{

navigator.clipboard.writeText(output.value);

const btn=document.getElementById("copyBtn");

btn.textContent="✅ Copied";

setTimeout(()=>{

btn.textContent="📋 Copy CSS";

},1500);

};

document.getElementById("clearBtn").onclick=()=>{

direction.value="row";
justify.value="flex-start";
align.value="stretch";

generate();

};