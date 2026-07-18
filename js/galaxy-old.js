// ==========================================
// TOOLBOX PRO GALAXY ENGINE
// PART 1
// ==========================================

const canvas = document.getElementById("spiralCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const galaxy = [];

const COLORS = [
    "#00d4ff",
    "#38bdf8",
    "#60a5fa",
    "#8b5cf6",
    "#a855f7",
    "#ffffff"
];

const ARMS = 6;
const COUNT = 14000;

for (let i = 0; i < COUNT; i++) {

    const arm = i % ARMS;

    const radius =
        Math.pow(Math.random(), 0.55) *
        Math.min(window.innerWidth, window.innerHeight) *
        0.95;

    const angle =
        (arm / ARMS) *
        Math.PI * 2;

    galaxy.push({

        radius,

        angle,

        arm,

        spin:
            Math.random() * Math.PI * 2,

        size:
            Math.random() * 1.8 + 0.3,

        speed:
            0.00015 +
            Math.random() * 0.0006,

        color:
            COLORS[
                Math.floor(
                    Math.random() *
                    COLORS.length
                )
            ]

    });

}

const stars = [];

for (let i = 0; i < 350; i++) {

    stars.push({

        x:
            Math.random() * window.innerWidth,

        y:
            Math.random() * window.innerHeight,

        size:
            Math.random() * 2,

        alpha:
            Math.random(),

        dir:
            Math.random() > .5 ? 1 : -1

    });

}

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", e => {

    mouseX =
        (e.clientX - window.innerWidth / 2) * .03;

    mouseY =
        (e.clientY - window.innerHeight / 2) * .03;

});
// ==========================================
// TOOLBOX PRO GALAXY ENGINE
// PART 2
// ==========================================

function drawStars() {

    stars.forEach(s => {

        s.alpha += 0.01 * s.dir;

        if (s.alpha > 1) {
            s.alpha = 1;
            s.dir = -1;
        }

        if (s.alpha < 0.2) {
            s.alpha = 0.2;
            s.dir = 1;
        }

        ctx.beginPath();

        ctx.fillStyle =
            `rgba(255,255,255,${s.alpha})`;

        ctx.arc(
            s.x,
            s.y,
            s.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

}

function drawGalaxy() {

    const cx =
        canvas.width / 2 + mouseX;

    const cy =
        canvas.height / 2 + mouseY;

    galaxy.forEach(p => {

        p.spin += p.speed;

        const spiral =
            p.radius * 0.020;

        const angle =
            p.angle +
            spiral +
            p.spin;

        const x =
            cx +
            Math.cos(angle) *
            p.radius;

        const y =
            cy +
            Math.sin(angle) *
            p.radius;

        ctx.beginPath();

        ctx.fillStyle =
            p.color;

        ctx.shadowBlur = 20;

        ctx.shadowColor =
            p.color;

        ctx.arc(
            x,
            y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

}
// ==========================================
// TOOLBOX PRO GALAXY ENGINE
// PART 3
// ==========================================

function drawCore() {

    const cx =
        canvas.width / 2 + mouseX;

    const cy =
        canvas.height / 2 + mouseY;

    // Main Core
    let core =
        ctx.createRadialGradient(
            cx,
            cy,
            0,
            cx,
            cy,
            180
        );

    core.addColorStop(0,"rgba(255,255,255,1)");
    core.addColorStop(.08,"rgba(180,220,255,1)");
    core.addColorStop(.18,"rgba(96,165,250,.95)");
    core.addColorStop(.35,"rgba(59,130,246,.45)");
    core.addColorStop(.7,"rgba(59,130,246,.05)");
    core.addColorStop(1,"rgba(0,0,0,0)");

    ctx.beginPath();
    ctx.fillStyle = core;
    ctx.arc(
        cx,
        cy,
        180,
        0,
        Math.PI*2
    );
    ctx.fill();

    // Purple Nebula
    let nebula =
        ctx.createRadialGradient(
            cx,
            cy,
            20,
            cx,
            cy,
            420
        );

    nebula.addColorStop(0,"rgba(168,85,247,.35)");
    nebula.addColorStop(.35,"rgba(99,102,241,.18)");
    nebula.addColorStop(1,"rgba(0,0,0,0)");

    ctx.beginPath();
    ctx.fillStyle = nebula;
    ctx.arc(
        cx,
        cy,
        420,
        0,
        Math.PI*2
    );
    ctx.fill();

    // Cyan Glow
    let glow =
        ctx.createRadialGradient(
            cx,
            cy,
            100,
            cx,
            cy,
            520
        );

    glow.addColorStop(0,"rgba(0,212,255,.12)");
    glow.addColorStop(.5,"rgba(37,99,235,.08)");
    glow.addColorStop(1,"rgba(0,0,0,0)");

    ctx.beginPath();
    ctx.fillStyle = glow;
    ctx.arc(
        cx,
        cy,
        520,
        0,
        Math.PI*2
    );
    ctx.fill();

}
// ==========================================
// TOOLBOX PRO GALAXY ENGINE
// PART 3
// ==========================================

function drawCore() {

    const cx =
        canvas.width / 2 + mouseX;

    const cy =
        canvas.height / 2 + mouseY;

    // Main Core
    let core =
        ctx.createRadialGradient(
            cx,
            cy,
            0,
            cx,
            cy,
            180
        );

    core.addColorStop(0,"rgba(255,255,255,1)");
    core.addColorStop(.08,"rgba(180,220,255,1)");
    core.addColorStop(.18,"rgba(96,165,250,.95)");
    core.addColorStop(.35,"rgba(59,130,246,.45)");
    core.addColorStop(.7,"rgba(59,130,246,.05)");
    core.addColorStop(1,"rgba(0,0,0,0)");

    ctx.beginPath();
    ctx.fillStyle = core;
    ctx.arc(
        cx,
        cy,
        180,
        0,
        Math.PI*2
    );
    ctx.fill();

    // Purple Nebula
    let nebula =
        ctx.createRadialGradient(
            cx,
            cy,
            20,
            cx,
            cy,
            420
        );

    nebula.addColorStop(0,"rgba(168,85,247,.35)");
    nebula.addColorStop(.35,"rgba(99,102,241,.18)");
    nebula.addColorStop(1,"rgba(0,0,0,0)");

    ctx.beginPath();
    ctx.fillStyle = nebula;
    ctx.arc(
        cx,
        cy,
        420,
        0,
        Math.PI*2
    );
    ctx.fill();

    // Cyan Glow
    let glow =
        ctx.createRadialGradient(
            cx,
            cy,
            100,
            cx,
            cy,
            520
        );

    glow.addColorStop(0,"rgba(0,212,255,.12)");
    glow.addColorStop(.5,"rgba(37,99,235,.08)");
    glow.addColorStop(1,"rgba(0,0,0,0)");

    ctx.beginPath();
    ctx.fillStyle = glow;
    ctx.arc(
        cx,
        cy,
        520,
        0,
        Math.PI*2
    );
    ctx.fill();

}