const canvas = document.getElementById("spiralCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = [];
const TOTAL = 9000;

const colors = [
    "#00d4ff",
    "#38bdf8",
    "#3b82f6",
    "#8b5cf6",
    "#c084fc",
    "#ffffff"
];

for(let i=0;i<TOTAL;i++){

    const arm = i % 5;

    particles.push({

        arm,

        radius: Math.random()*650,

        angle: Math.random()*Math.PI*2,

        size: Math.random()*2+0.3,

        speed: 0.0004+Math.random()*0.0008,

        color: colors[Math.floor(Math.random()*colors.length)]

    });

}

let mouseX=0;
let mouseY=0;

window.addEventListener("mousemove",e=>{

mouseX=(e.clientX-window.innerWidth/2)*0.02;
mouseY=(e.clientY-window.innerHeight/2)*0.02;

});

function animate(){

ctx.fillStyle="rgba(2,6,23,.12)";
ctx.fillRect(0,0,canvas.width,canvas.height);

const cx=canvas.width/2+mouseX;
const cy=canvas.height/2+mouseY;

particles.forEach(p=>{

p.angle+=p.speed;

const twist=p.radius*0.015;

const a=p.angle+twist+p.arm*(Math.PI*2/5);

const x=Math.cos(a)*p.radius+cx;

const y=Math.sin(a)*p.radius+cy;

ctx.beginPath();

ctx.fillStyle=p.color;

ctx.shadowBlur=18;
ctx.shadowColor=p.color;

ctx.arc(x,y,p.size,0,Math.PI*2);

ctx.fill();

});

const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,220);

glow.addColorStop(0,"rgba(255,255,255,1)");
glow.addColorStop(.08,"rgba(96,165,250,.95)");
glow.addColorStop(.25,"rgba(59,130,246,.55)");
glow.addColorStop(.6,"rgba(99,102,241,.15)");
glow.addColorStop(1,"rgba(0,0,0,0)");

ctx.beginPath();
ctx.fillStyle=glow;
ctx.arc(cx,cy,220,0,Math.PI*2);
ctx.fill();

requestAnimationFrame(animate);

}

animate();