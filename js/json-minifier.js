const input = document.getElementById("jsonInput");
const output = document.getElementById("jsonOutput");

document.getElementById("minifyBtn").onclick = () => {

    try {

        output.value = JSON.stringify(JSON.parse(input.value));

    } catch {

        output.value = "Invalid JSON";

    }

};

document.getElementById("copyBtn").onclick = () => {

    navigator.clipboard.writeText(output.value);

};