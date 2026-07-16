const pdfFile = document.getElementById("pdfFile");
const convertBtn = document.getElementById("convertBtn");
const preview = document.getElementById("preview");

convertBtn.addEventListener("click", async () => {

    if (!pdfFile.files.length) {

        alert("Select a PDF first.");
        return;

    }

    preview.innerHTML = "";

    const buffer = await pdfFile.files[0].arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
        data: buffer
    }).promise;

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {

        const page = await pdf.getPage(pageNum);

        const viewport = page.getViewport({
            scale: 2
        });

        const canvas = document.createElement("canvas");

        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
            canvasContext: ctx,
            viewport
        }).promise;

        const img = document.createElement("img");

        img.src = canvas.toDataURL("image/jpeg", 1);

        img.style.width = "100%";
        img.style.borderRadius = "10px";

        const download = document.createElement("a");

        download.href = img.src;
        download.download = `page-${pageNum}.jpg`;
        download.textContent = "⬇ Download JPG";
        download.className = "primary-btn";
        download.style.display = "block";
        download.style.marginTop = "10px";

        const card = document.createElement("div");

        card.appendChild(img);
        card.appendChild(download);

        preview.appendChild(card);

    }

});