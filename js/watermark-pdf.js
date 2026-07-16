const fileInput = document.getElementById("pdfFile");
const textInput = document.getElementById("watermarkText");
const fontSize = document.getElementById("fontSize");
const opacity = document.getElementById("opacity");
const colorPicker = document.getElementById("color");
const button = document.getElementById("watermarkBtn");

button.addEventListener("click", async () => {

    if (!fileInput.files.length) {

        alert("Select a PDF first.");

        return;

    }

    const file = fileInput.files[0];

    const bytes = await file.arrayBuffer();

    const pdfDoc = await PDFLib.PDFDocument.load(bytes);

    const pages = pdfDoc.getPages();

    const text = textInput.value || "CONFIDENTIAL";

    const hex = colorPicker.value.replace("#", "");

    const r = parseInt(hex.substring(0,2),16)/255;
    const g = parseInt(hex.substring(2,4),16)/255;
    const b = parseInt(hex.substring(4,6),16)/255;

    for(const page of pages){

        const {width,height}=page.getSize();

        page.drawText(text,{

            x:width/5,

            y:height/2,

            size:Number(fontSize.value),

            rotate:PDFLib.degrees(45),

            color:PDFLib.rgb(r,g,b),

            opacity:Number(opacity.value)

        });

    }

    const pdfBytes=await pdfDoc.save();

    const blob=new Blob([pdfBytes],{

        type:"application/pdf"

    });

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="watermarked.pdf";

    a.click();

    URL.revokeObjectURL(url);

});