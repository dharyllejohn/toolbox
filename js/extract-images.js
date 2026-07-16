const pdfFile=document.getElementById("pdfFile");
const extractBtn=document.getElementById("extractBtn");
const gallery=document.getElementById("gallery");

extractBtn.onclick=async()=>{

if(!pdfFile.files.length){

alert("Please select a PDF.");

return;

}

gallery.innerHTML="";

const buffer=await pdfFile.files[0].arrayBuffer();

const pdf=await pdfjsLib.getDocument({

data:buffer

}).promise;

for(let i=1;i<=pdf.numPages;i++){

const page=await pdf.getPage(i);

const viewport=page.getViewport({

scale:2

});

const canvas=document.createElement("canvas");

canvas.width=viewport.width;
canvas.height=viewport.height;

const ctx=canvas.getContext("2d");

await page.render({

canvasContext:ctx,
viewport

}).promise;

const img=document.createElement("img");

img.src=canvas.toDataURL("image/png");

img.style.width="100%";
img.style.borderRadius="10px";

const download=document.createElement("a");

download.href=img.src;
download.download=`page-${i}.png`;

download.className="primary-btn";

download.style.display="block";
download.style.marginTop="10px";

download.textContent="⬇ Download";

const card=document.createElement("div");

card.appendChild(img);
card.appendChild(download);

gallery.appendChild(card);

}

};