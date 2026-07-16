const title = document.getElementById("title");
const description = document.getElementById("description");
const url = document.getElementById("url");
const image = document.getElementById("image");
const siteName = document.getElementById("siteName");
const type = document.getElementById("type");
const locale = document.getElementById("locale");

const output = document.getElementById("output");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

generateBtn.addEventListener("click", () => {

let html = "";

html += `<meta property="og:title" content="${title.value}">\n`;
html += `<meta property="og:description" content="${description.value}">\n`;
html += `<meta property="og:url" content="${url.value}">\n`;
html += `<meta property="og:image" content="${image.value}">\n`;
html += `<meta property="og:site_name" content="${siteName.value}">\n`;
html += `<meta property="og:type" content="${type.value}">\n`;
html += `<meta property="og:locale" content="${locale.value}">\n`;

output.value = html;

});

copyBtn.addEventListener("click", () => {

if (!output.value) return;

navigator.clipboard.writeText(output.value);

copyBtn.textContent = "✅ Copied";

setTimeout(() => {

copyBtn.textContent = "📋 Copy";

},1500);

});

clearBtn.addEventListener("click", () => {

title.value = "";
description.value = "";
url.value = "";
image.value = "";
siteName.value = "";
type.value = "website";
locale.value = "en_US";
output.value = "";

});