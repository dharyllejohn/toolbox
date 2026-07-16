const text = document.getElementById("text");

document.getElementById("analyzeBtn").addEventListener("click", () => {

  const value = text.value.trim();

  const words = value ? value.split(/\s+/).length : 0;

  const chars = text.value.length;

  const noSpaces = text.value.replace(/\s/g, "").length;

  const paragraphs = value
    ? value.split(/\n+/).filter(p => p.trim() !== "").length
    : 0;

  const readingSeconds = Math.ceil(words / 200 * 60);

  document.getElementById("words").textContent = words;
  document.getElementById("characters").textContent = chars;
  document.getElementById("noSpaces").textContent = noSpaces;
  document.getElementById("paragraphs").textContent = paragraphs;
  document.getElementById("reading").textContent =
    readingSeconds + " sec";

});