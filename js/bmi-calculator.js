const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const resultInput = document.getElementById("result");
const categoryText = document.getElementById("category");

document
  .getElementById("calculateBtn")
  .addEventListener("click", calculateBMI);

function calculateBMI() {
  const height = parseFloat(heightInput.value);
  const weight = parseFloat(weightInput.value);

  if (!height || !weight || height <= 0 || weight <= 0) {
    alert("Please enter a valid height and weight.");
    return;
  }

  const bmi = weight / Math.pow(height / 100, 2);

  resultInput.value = bmi.toFixed(1);

  let category = "";
  let emoji = "";

  if (bmi < 18.5) {
    category = "Underweight";
    emoji = "🔵";
  } else if (bmi < 25) {
    category = "Normal Weight";
    emoji = "🟢";
  } else if (bmi < 30) {
    category = "Overweight";
    emoji = "🟠";
  } else {
    category = "Obese";
    emoji = "🔴";
  }

  categoryText.textContent = `${emoji} BMI Category: ${category}`;
}

document.getElementById("copyBtn").addEventListener("click", async () => {
  if (!resultInput.value) return;

  try {
    await navigator.clipboard.writeText(resultInput.value);
    alert("BMI copied!");
  } catch {
    alert("Unable to copy.");
  }
});