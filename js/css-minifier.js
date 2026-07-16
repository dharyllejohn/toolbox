const input = document.getElementById("input");
const output = document.getElementById("output");

document.getElementById("minifyBtn").onclick = () => {

    output.value = input.value
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\s+/g, " ")
        .replace(/\s*([{}:;,])\s*/g, "$1")
        .trim();

};

document.getElementById("copyBtn").onclick = () => {

    navigator.clipboard.writeText(output.value);

};