const radius = document.getElementById("radius");
const preview = document.getElementById("preview");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");


function updateRadius(){

    const css = `border-radius: ${radius.value}px;`;

    preview.style.borderRadius = radius.value + "px";

    output.value = css;

}


// Auto update
radius.addEventListener("input", updateRadius);


// Copy CSS
copyBtn.addEventListener("click", async ()=>{

    try{

        await navigator.clipboard.writeText(output.value);

        copyBtn.innerHTML = "✅ Copied!";

        setTimeout(()=>{
            copyBtn.innerHTML = "📋 Copy CSS";
        },1500);


    }catch(error){

        output.select();
        document.execCommand("copy");

        copyBtn.innerHTML = "✅ Copied!";

        setTimeout(()=>{
            copyBtn.innerHTML = "📋 Copy CSS";
        },1500);

    }

});


// Initial load
updateRadius();