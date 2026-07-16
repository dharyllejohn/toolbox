const userAgent = document.getElementById("userAgent");
const allow = document.getElementById("allow");
const disallow = document.getElementById("disallow");
const crawlDelay = document.getElementById("crawlDelay");
const sitemap = document.getElementById("sitemap");

const output = document.getElementById("output");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");

generateBtn.addEventListener("click", () => {

    let text = "";

    text += `User-agent: ${userAgent.value || "*"}\n`;

    if (allow.value.trim() !== "") {
        text += `Allow: ${allow.value.trim()}\n`;
    }

    if (disallow.value.trim() !== "") {
        text += `Disallow: ${disallow.value.trim()}\n`;
    }

    if (crawlDelay.value.trim() !== "") {
        text += `Crawl-delay: ${crawlDelay.value.trim()}\n`;
    }

    if (sitemap.value.trim() !== "") {
        text += `Sitemap: ${sitemap.value.trim()}\n`;
    }

    output.value = text;

});

copyBtn.addEventListener("click", () => {

    if (!output.value) return;

    navigator.clipboard.writeText(output.value);

    copyBtn.textContent = "✅ Copied";

    setTimeout(() => {

        copyBtn.textContent = "📋 Copy";

    }, 1500);

});

downloadBtn.addEventListener("click", () => {

    if (!output.value) return;

    const blob = new Blob([output.value], {
        type: "text/plain"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "robots.txt";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

});

clearBtn.addEventListener("click", () => {

    userAgent.value = "*";
    allow.value = "";
    disallow.value = "";
    crawlDelay.value = "";
    sitemap.value = "";
    output.value = "";

});