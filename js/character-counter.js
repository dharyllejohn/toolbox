const text = document.getElementById("text");

document.getElementById("countBtn").addEventListener("click", () => {

    const value = text.value;

    const characters = value.length;

    const noSpaces = value.replace(/\s/g, "").length;

    const words = value.trim()
        ? value.trim().split(/\s+/).length
        : 0;

    const lines = value
        ? value.split("\n").length
        : 0;

    const spaces = (value.match(/ /g) || []).length;

    document.getElementById("characters").textContent = characters;

    document.getElementById("noSpaces").textContent = noSpaces;

    document.getElementById("words").textContent = words;

    document.getElementById("lines").textContent = lines;

    document.getElementById("spaces").textContent = spaces;

});