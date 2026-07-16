const input = document.getElementById("uuidInput");
const result = document.getElementById("result");

document.getElementById("validateBtn").onclick = () => {

    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (regex.test(input.value.trim())) {

        result.value = "✅ Valid UUID";

    } else {

        result.value = "❌ Invalid UUID";

    }

};