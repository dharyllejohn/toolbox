const input = document.getElementById("input");
const output = document.getElementById("output");

document.getElementById("minifyBtn").onclick = () => {

    output.value = input.value
        .replace(/>\s+</g, "><")
        .replace(/\n/g, "")
        .replace(/\s{2,}/g, " ")
        .trim();

};

document.getElementById("copyBtn").onclick = () => {

    navigator.clipboard.writeText(output.value);

};