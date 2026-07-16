const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const angle = document.getElementById("angle");

const preview = document.getElementById("preview");
const output = document.getElementById("output");

const copyBtn = document.getElementById("copyBtn");
const angleValue = document.getElementById("angleValue");

function generateGradient(){

const css=`linear-gradient(${angle.value}deg, ${color1.value}, ${color2.value})`;

preview.style.background=css;

output.value=`background: ${css};`;

angleValue.textContent=angle.value+"°";

}

color1.addEventListener("input",generateGradient);

color2.addEventListener("input",generateGradient);

angle.addEventListener("input",generateGradient);

copyBtn.addEventListener("click",async()=>{

try{

await navigator.clipboard.writeText(output.value);

copyBtn.textContent="✅ Copied!";

setTimeout(()=>{

copyBtn.textContent="📋 Copy CSS";

},1500);

}catch{

alert("Copy failed.");

}

});

generateGradient();