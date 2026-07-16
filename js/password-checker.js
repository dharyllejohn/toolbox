document.getElementById("checkBtn").onclick=()=>{

const password=document.getElementById("password").value;

let score=0;

if(password.length>=8) score++;

if(/[A-Z]/.test(password)) score++;

if(/[a-z]/.test(password)) score++;

if(/[0-9]/.test(password)) score++;

if(/[^A-Za-z0-9]/.test(password)) score++;

const strength=document.getElementById("strength");
const text=document.getElementById("score");

const levels=[
"Very Weak",
"Weak",
"Fair",
"Good",
"Strong",
"Excellent"
];

strength.innerHTML="Strength: "+levels[score];

text.innerHTML=`Score: ${score}/5`;

};