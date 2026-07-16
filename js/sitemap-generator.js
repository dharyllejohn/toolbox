const website = document.getElementById("website");
const pageUrl = document.getElementById("pageUrl");
const priority = document.getElementById("priority");
const changefreq = document.getElementById("changefreq");

const addBtn = document.getElementById("addBtn");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
const clearBtn = document.getElementById("clearBtn");

const pageList = document.getElementById("pageList");
const output = document.getElementById("output");

let pages = [];

addBtn.addEventListener("click", () => {

    const site = website.value.trim();
    let page = pageUrl.value.trim();

    if (!site) {
        alert("Enter website URL.");
        return;
    }

    if (!page) {
        alert("Enter page URL.");
        return;
    }

    if (!page.startsWith("/")) {
        page = "/" + page;
    }

    pages.push({
        url: site.replace(/\/$/, "") + page,
        priority: priority.value,
        changefreq: changefreq.value
    });

    renderPages();

    pageUrl.value = "";

});

function renderPages() {

    pageList.innerHTML = "";

    pages.forEach((item, index) => {

        const div = document.createElement("div");

        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.marginBottom = "8px";

        div.innerHTML = `
            <span>${item.url}</span>
            <button data-index="${index}">❌</button>
        `;

        div.querySelector("button").onclick = () => {

            pages.splice(index, 1);
            renderPages();

        };

        pageList.appendChild(div);

    });

}

generateBtn.addEventListener("click", () => {

    if (pages.length === 0) {
        alert("Add at least one page.");
        return;
    }

    const today = new Date().toISOString().split("T")[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    pages.forEach(page => {

        xml += `  <url>\n`;
        xml += `    <loc>${page.url}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += `  </url>\n`;

    });

    xml += `</urlset>`;

    output.value = xml;

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
        type: "application/xml"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "sitemap.xml";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

});

clearBtn.addEventListener("click", () => {

    website.value = "";
    pageUrl.value = "";
    output.value = "";

    pages = [];

    renderPages();

});