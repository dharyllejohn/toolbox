const picker = document.getElementById("colorPicker");
const hex = document.getElementById("hexValue");
const rgb = document.getElementById("rgbValue");
const hsl = document.getElementById("hslValue");
const copyBtn = document.getElementById("copyBtn");

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;

        s = l > 0.5
            ? d / (2 - max - min)
            : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;

            case g:
                h = (b - r) / d + 2;
                break;

            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    return [
        Math.round(h * 360),
        Math.round(s * 100),
        Math.round(l * 100)
    ];
}

function updateColor() {

    const value = picker.value;

    hex.value = value;

    document.body.style.background = value;

    const r = parseInt(value.substring(1, 3), 16);
    const g = parseInt(value.substring(3, 5), 16);
    const b = parseInt(value.substring(5, 7), 16);

    rgb.value = `rgb(${r}, ${g}, ${b})`;

    const hslColor = rgbToHsl(r, g, b);

    hsl.value = `hsl(${hslColor[0]}, ${hslColor[1]}%, ${hslColor[2]}%)`;
}

picker.addEventListener("input", updateColor);

copyBtn.addEventListener("click", async () => {

    await navigator.clipboard.writeText(hex.value);

    const original = copyBtn.textContent;

    copyBtn.textContent = "✅ Copied!";

    setTimeout(() => {
        copyBtn.textContent = original;
    }, 1500);

});

updateColor();