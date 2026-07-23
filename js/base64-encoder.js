const input = document.getElementById("textInput");
const output = document.getElementById("textOutput");

document.getElementById("encodeBtn").onclick = () => {

    try {

        output.value = btoa(unescape(encodeURIComponent(input.value)));

    } catch {

        output.value = "Unable to encode.";

    }

};

document.getElementById("copyBtn").onclick = () => {

    navigator.clipboard.writeText(output.value);

};