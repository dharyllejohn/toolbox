const output = document.getElementById("uuidOutput");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

function generateUUID() {
    if (window.crypto && crypto.randomUUID) {
        output.value = crypto.randomUUID();
    } else {
        output.value = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

generateBtn.addEventListener("click", generateUUID);

copyBtn.addEventListener("click", () => {
    if (!output.value) return;

    navigator.clipboard.writeText(output.value);

    copyBtn.textContent = "✅ Copied!";

    setTimeout(() => {
        copyBtn.textContent = "📋 Copy UUID";
    }, 1500);
});

generateUUID();