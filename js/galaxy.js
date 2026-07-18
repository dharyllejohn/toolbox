/* ==========================================
   TOOLBOX PRO
   THREE.JS GALAXY ENGINE V1
========================================== */

console.log("🌌 Three.js Galaxy Loaded");


const container = document.getElementById("galaxy");


if(container){


/* =========================
   SCENE
========================= */

const scene = new THREE.Scene();


/* =========================
   CAMERA
========================= */

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);


camera.position.z = 22;



/* =========================
   RENDERER
========================= */

const renderer =
new THREE.WebGLRenderer({

    antialias:true,

    alpha:true

});


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.setPixelRatio(
    window.devicePixelRatio
);


container.appendChild(
    renderer.domElement
);




/* =========================
   GALAXY GROUP
========================= */


const galaxy =
new THREE.Group();


scene.add(galaxy);



/* =========================
   PARTICLES
========================= */


const COUNT = 30000;


const geometry =
new THREE.BufferGeometry();



const positions =
new Float32Array(
    COUNT * 3
);


const colors =
new Float32Array(
    COUNT * 3
);



const colorInside =
new THREE.Color("#ffffff");


const colorOutside =
new THREE.Color("#2563eb");



for(let i=0;i<COUNT;i++){


    const radius =
    Math.random()*12;


    const branch =
    i % 6;


    const branchAngle =
    (branch/6)
    *
    Math.PI*2;



    const spin =
    radius * 0.45;



    const random =
    (Math.random()-0.5)
    *
    radius
    *
    0.35;



    const x =
    Math.cos(
        branchAngle + spin
    )
    *
    radius
    +
    random;



    const y =
    (Math.random()-0.5)
    *
    radius
    *
    0.25;



    const z =
    Math.sin(
        branchAngle + spin
    )
    *
    radius
    +
    random;



    positions[i*3]=x;

    positions[i*3+1]=y;

    positions[i*3+2]=z;



    const mixed =
    colorInside.clone()
    .lerp(
        colorOutside,
        radius/12
    );


    colors[i*3]=mixed.r;

    colors[i*3+1]=mixed.g;

    colors[i*3+2]=mixed.b;


}



geometry.setAttribute(
"position",
new THREE.BufferAttribute(
positions,
3
)
);



geometry.setAttribute(
"color",
new THREE.BufferAttribute(
colors,
3
)
);




/* =========================
   MATERIAL
========================= */


const material =
new THREE.PointsMaterial({

size:0.035,

sizeAttenuation:true,

vertexColors:true,

transparent:true,

opacity:.9,

blending:
THREE.AdditiveBlending

});




const particles =
new THREE.Points(
geometry,
material
);



galaxy.add(
particles
);




/* =========================
   BLACK HOLE CORE
========================= */


const coreGeometry =
new THREE.SphereGeometry(
0.8,
64,
64
);



const coreMaterial =
new THREE.MeshBasicMaterial({

color:"#020617"

});



const blackHole =
new THREE.Mesh(
coreGeometry,
coreMaterial
);


galaxy.add(
blackHole
);



/* =========================
   MOUSE MOVEMENT
========================= */


let mouseX=0;
let mouseY=0;



window.addEventListener(
"mousemove",
(e)=>{


mouseX =
(e.clientX /
window.innerWidth
-
0.5);



mouseY =
(e.clientY /
window.innerHeight
-
0.5);



});





/* =========================
   ANIMATION
========================= */


function animate(){


requestAnimationFrame(
animate
);



particles.rotation.y +=
0.0008;



particles.rotation.x +=
0.00015;



camera.position.x +=
(mouseX*3 -
camera.position.x)
*
0.03;



camera.position.y +=
(-mouseY*3 -
camera.position.y)
*
0.03;



camera.lookAt(
scene.position
);



renderer.render(
scene,
camera
);



}



animate();




/* =========================
   RESIZE
========================= */


window.addEventListener(
"resize",
()=>{


camera.aspect =
window.innerWidth /
window.innerHeight;


camera.updateProjectionMatrix();



renderer.setSize(
window.innerWidth,
window.innerHeight
);


});



}