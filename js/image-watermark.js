const { PDFDocument, rgb, degrees, StandardFonts } = PDFLib;

console.log("watermark-pdf.js loaded");

window.onload = () => {

    console.log("Page loaded");

    const btn = document.getElementById("watermarkBtn");

    console.log(btn);

    if (!btn) {
        alert("Button not found!");
        return;
    }

    btn.onclick = async () => {

        alert("Button clicked!");

        try {

            const file = document.getElementById("pdfFile").files[0];

            if (!file) {
                alert("Please select a PDF.");
                return;
            }

            const text = document.getElementById("watermarkText").value || "CONFIDENTIAL";
            const fontSize = parseInt(document.getElementById("fontSize").value) || 40;
            const opacity = parseFloat(document.getElementById("opacity").value) || 0.3;

            const color = document.getElementById("color").value;

            const r = parseInt(color.substring(1,3),16)/255;
            const g = parseInt(color.substring(3,5),16)/255;
            const b = parseInt(color.substring(5,7),16)/255;

            const bytes = await file.arrayBuffer();

            const pdfDoc = await PDFDocument.load(bytes);

            const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

            pdfDoc.getPages().forEach(page=>{

                const {width,height}=page.getSize();

                page.drawText(text,{
                    x:width/4,
                    y:height/2,
                    size:fontSize,
                    font,
                    color:rgb(r,g,b),
                    opacity,
                    rotate:degrees(45)
                });

            });

            const pdfBytes=await pdfDoc.save();

            const blob=new Blob([pdfBytes],{type:"application/pdf"});

            const url=URL.createObjectURL(blob);

            const a=document.createElement("a");
            a.href=url;
            a.download="watermarked.pdf";
            a.click();

            URL.revokeObjectURL(url);

        } catch(err){
            console.error(err);
            alert(err.message);
        }

    };

};