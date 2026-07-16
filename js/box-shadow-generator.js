const blur = document.getElementById("blur");
const spread = document.getElementById("spread");
const preview = document.getElementById("preview");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");


function updateShadow(){

    const shadow = `0px 4px ${blur.value}px ${spread.value}px rgba(0, 0, 0, 0.25)`;

    preview.style.boxShadow = shadow;

    output.value = `box-shadow: ${shadow};`;

}


// Auto generate habang gumagalaw slider
blur.addEventListener("input", updateShadow);
spread.addEventListener("input", updateShadow);


// Copy button
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


// Initial generate
updateShadow();