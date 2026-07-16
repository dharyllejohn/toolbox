const category = document.getElementById("category");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const inputValue = document.getElementById("inputValue");
const result = document.getElementById("result");

const data = {
  length: {
    Meter: 1,
    Kilometer: 1000,
    Centimeter: 0.01,
    Millimeter: 0.001,
    Inch: 0.0254,
    Foot: 0.3048,
    Yard: 0.9144,
    Mile: 1609.344
  },

  weight: {
    Kilogram: 1,
    Gram: 0.001,
    Pound: 0.45359237,
    Ounce: 0.0283495
  }
};

function loadUnits() {

  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  if (category.value === "temperature") {

    ["Celsius", "Fahrenheit", "Kelvin"].forEach(unit => {

      fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
      toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;

    });

    return;
  }

  Object.keys(data[category.value]).forEach(unit => {

    fromUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    toUnit.innerHTML += `<option value="${unit}">${unit}</option>`;

  });

}

loadUnits();

category.addEventListener("change", loadUnits);

document.getElementById("convertBtn").addEventListener("click", () => {

  const value = parseFloat(inputValue.value);

  if (isNaN(value)) {

    alert("Please enter a value.");
    return;

  }

  let answer;

  if (category.value === "temperature") {

    let celsius;

    switch (fromUnit.value) {

      case "Celsius":
        celsius = value;
        break;

      case "Fahrenheit":
        celsius = (value - 32) * 5 / 9;
        break;

      case "Kelvin":
        celsius = value - 273.15;
        break;

    }

    switch (toUnit.value) {

      case "Celsius":
        answer = celsius;
        break;

      case "Fahrenheit":
        answer = celsius * 9 / 5 + 32;
        break;

      case "Kelvin":
        answer = celsius + 273.15;
        break;

    }

  } else {

    const base = value * data[category.value][fromUnit.value];
    answer = base / data[category.value][toUnit.value];

  }

  result.value = Number(answer).toFixed(4);

});

document.getElementById("copyBtn").addEventListener("click", async () => {

  if (!result.value) return;

  await navigator.clipboard.writeText(result.value);

  alert("Copied!");

});