const minute = document.getElementById("minute");
const hour = document.getElementById("hour");
const day = document.getElementById("day");
const month = document.getElementById("month");
const weekday = document.getElementById("weekday");

const output = document.getElementById("output");

document.getElementById("generateBtn").onclick = () => {

    output.value =
`${minute.value || "*"} ${hour.value || "*"} ${day.value || "*"} ${month.value || "*"} ${weekday.value || "*"}`;

};

document.getElementById("copyBtn").onclick = () => {

    navigator.clipboard.writeText(output.value);

};