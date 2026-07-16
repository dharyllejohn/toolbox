const input = document.getElementById("textInput");
const output = document.getElementById("textOutput");

document.getElementById("decodeBtn").onclick = () => {

    try {

        output.value = decodeURIComponent(escape(atob(input.value.trim())));

    } catch {

        output.value = "Invalid Base64.";

    }

};

document.getElementById("copyBtn").onclick = () => {

    navigator.clipboard.writeText(output.value);

};