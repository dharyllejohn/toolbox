const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const passwordField = document.getElementById("password");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const strength = document.getElementById("strength");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-={}[]<>?/";

lengthSlider.addEventListener("input", () => {

    lengthValue.textContent = lengthSlider.value;

});

function generatePassword() {

    let chars = "";

    if (uppercase.checked) chars += upperChars;
    if (lowercase.checked) chars += lowerChars;
    if (numbers.checked) chars += numberChars;
    if (symbols.checked) chars += symbolChars;

    if (chars === "") {

        alert("Select at least one option.");

        return;

    }

    let password = "";

    for (let i = 0; i < Number(lengthSlider.value); i++) {

        const random = Math.floor(Math.random() * chars.length);

        password += chars[random];

    }

    passwordField.value = password;

    updateStrength();

}

function updateStrength() {

    let score = 0;

    if (uppercase.checked) score++;
    if (lowercase.checked) score++;
    if (numbers.checked) score++;
    if (symbols.checked) score++;

    if (lengthSlider.value >= 16) score++;

    if (score <= 2) {

        strength.textContent = "Strength: Weak";

        strength.style.color = "#ff4d4d";

    }

    else if (score <= 4) {

        strength.textContent = "Strength: Medium";

        strength.style.color = "#ffb703";

    }

    else {

        strength.textContent = "Strength: Strong";

        strength.style.color = "#00d26a";

    }

}

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", async () => {

    if (!passwordField.value) return;

    await navigator.clipboard.writeText(passwordField.value);

    const original = copyBtn.textContent;

    copyBtn.textContent = "✅ Copied!";

    setTimeout(() => {

        copyBtn.textContent = original;

    },1500);

});

generatePassword();