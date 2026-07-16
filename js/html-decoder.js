const input = document.getElementById("input");
const output = document.getElementById("output");

document.getElementById("decodeBtn").onclick = () => {

    const textarea = document.createElement("textarea");
    textarea.innerHTML = input.value;

    output.value = textarea.value;

};

document.getElementById("copyBtn").onclick = () => {

    navigator.clipboard.writeText(output.value);

};