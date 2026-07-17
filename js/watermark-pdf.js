const { PDFDocument, rgb, degrees, StandardFonts } = PDFLib;

document.getElementById("watermarkBtn").addEventListener("click", async () => {

    try {

        const file = document.getElementById("pdfFile").files[0];

        if (!file) {
            alert("Please select a PDF.");
            return;
        }

        const text = document.getElementById("watermarkText").value || "CONFIDENTIAL";
        const fontSize = Number(document.getElementById("fontSize").value);
        const opacity = Number(document.getElementById("opacity").value);

        const color = document.getElementById("color").value;

        const r = parseInt(color.slice(1,3),16)/255;
        const g = parseInt(color.slice(3,5),16)/255;
        const b = parseInt(color.slice(5,7),16)/255;

        const pdfBytes = await file.arrayBuffer();

        const pdfDoc = await PDFDocument.load(pdfBytes);

        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        const pages = pdfDoc.getPages();

        for (const page of pages) {

            const { width, height } = page.getSize();

            const textWidth = font.widthOfTextAtSize(text, fontSize);

            page.drawText(text,{
                x:(width-textWidth)/2,
                y:height/2,
                font,
                size:fontSize,
                rotate:degrees(45),
                color:rgb(r,g,b),
                opacity
            });

        }

        const result = await pdfDoc.save();

        const blob = new Blob([result],{
            type:"application/pdf"
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "watermarked.pdf";
        a.click();

        URL.revokeObjectURL(url);

    } catch(err){

        console.error(err);
        alert(err);

    }

});