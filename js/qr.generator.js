/* ==========================================
   TOOLBOX PRO - QR GENERATOR
========================================== */

const qrText = document.getElementById("qrText");
const generateBtn = document.getElementById("generateBtn");
const qrResult = document.getElementById("qrResult");
const downloadBtn = document.getElementById("downloadBtn");

let qrCode = null;

generateBtn.addEventListener("click", () => {

    const text = qrText.value.trim();

    if (!text) {
        alert("Please enter text or a URL.");
        qrText.focus();
        return;
    }

    // Clear previous QR
    qrResult.innerHTML = "";

    // Generate new QR
    qrCode = new QRCode(qrResult, {
        text: text,
        width: 250,
        height: 250,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    // Show download button after QR is rendered
    setTimeout(() => {
        downloadBtn.style.display = "inline-block";
    }, 300);

});

downloadBtn.addEventListener("click", () => {

    const img = qrResult.querySelector("img");
    const canvas = qrResult.querySelector("canvas");

    let dataURL = "";

    if (img) {
        dataURL = img.src;
    } else if (canvas) {
        dataURL = canvas.toDataURL("image/png");
    } else {
        alert("Generate a QR code first.");
        return;
    }

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "toolboxpro-qr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

});

// Press Enter + Ctrl to generate
qrText.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
        generateBtn.click();
    }
});