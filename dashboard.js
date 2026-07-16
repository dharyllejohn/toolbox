/* ==========================================
ToolBox Pro Dashboard
dashboard.js
Created by Daryl John
========================================== */

const userBadge = document.getElementById("userBadge");

const welcomeText = document.getElementById("welcomeText");

const logoutBtn = document.getElementById("logoutBtn");

const proBadge = document.getElementById("proBadge");

const planText = document.getElementById("planText");

const accountEmail = document.getElementById("accountEmail");

const accountType = document.getElementById("accountType");

const memberSince = document.getElementById("memberSince");

const subscriptionStatus = document.getElementById("subscriptionStatus");

const planName = document.getElementById("planName");

const planDescription = document.getElementById("planDescription");

const upgradeButton = document.getElementById("upgradeButton");

/* ==========================================
CHECK CURRENT USER
========================================== */

async function checkUser(){

    try{

        const {

            data:{ user },

            error

        } = await supabaseClient.auth.getUser();

        if(error || !user){

            location.href="auth.html";

            return;

        }

        loadUser(user);

    }

    catch(err){

        console.error(err);

        location.href="auth.html";

    }

}
/* ==========================================
LOAD USER INFORMATION
========================================== */

async function loadUser(user){

    userBadge.innerHTML="👤 "+user.email;

    welcomeText.innerHTML=

    "Welcome back, <b>"+user.email+"</b>";

    accountEmail.innerHTML=user.email;

    if(user.created_at){

        const date=new Date(user.created_at);

        memberSince.innerHTML=date.toLocaleDateString();

    }

    const {

        data:profile,

        error

    }=await supabaseClient

    .from(PROFILE_TABLE)

    .select("*")

    .eq("id",user.id)

    .maybeSingle();

    if(error){

        console.error(error);

        return;

    }

    if(!profile){

        accountType.innerHTML="FREE";

        subscriptionStatus.innerHTML="Inactive";

        planText.innerHTML="FREE";

        proBadge.innerHTML="FREE PLAN";

        planName.innerHTML="FREE PLAN";

        planDescription.innerHTML=

        "Upgrade to ToolBox PRO to unlock premium tools.";

        return;

    }

    if(profile.is_pro){

        accountType.innerHTML="PRO";

        subscriptionStatus.innerHTML="Active";

        planText.innerHTML="PRO";

        proBadge.innerHTML="⭐ PRO USER";

        planName.innerHTML="PRO PLAN";

        planDescription.innerHTML=

        "You have unlimited access to all ToolBox Pro features.";

        upgradeButton.style.display="none";

    }

    else{

        accountType.innerHTML="FREE";

        subscriptionStatus.innerHTML="Inactive";

        planText.innerHTML="FREE";

        proBadge.innerHTML="FREE PLAN";

        planName.innerHTML="FREE PLAN";

        planDescription.innerHTML=

        "Upgrade anytime to unlock premium tools.";

    }

}
/* ==========================================
LOGOUT
========================================== */

async function logout(){

    try{

        await supabaseClient.auth.signOut();

        location.href="auth.html";

    }

    catch(err){

        console.error(err);

        alert("Logout failed.");

    }

}

/* Logout Button */

if(logoutBtn){

    logoutBtn.addEventListener("click",logout);

}
/* ==========================================
AUTH STATE LISTENER
========================================== */

supabaseClient.auth.onAuthStateChange(

    (event,session)=>{

        console.log("Auth:",event);

        if(event==="SIGNED_OUT"){

            location.href="auth.html";

        }

        if(event==="SIGNED_IN"){

            if(session){

                loadUser(session.user);

            }

        }

    }

);

/* ==========================================
INITIALIZE DASHBOARD
========================================== */

window.addEventListener(

    "DOMContentLoaded",

    ()=>{

        checkUser();

    }

);
/* ==========================================
UPDATE PRO STATUS
========================================== */

function updatePlanUI(profile){

    if(!profile){

        return;

    }

    if(profile.is_pro){

        proBadge.textContent="⭐ PRO USER";

        proBadge.style.background="linear-gradient(135deg,#f59e0b,#f97316)";

        planText.textContent="PRO";

        accountType.textContent="PRO";

        subscriptionStatus.textContent="Active";

        planName.textContent="PRO PLAN";

        planDescription.textContent=

        "Thank you for supporting ToolBox Pro. Enjoy unlimited access to all premium tools.";

        if(upgradeButton){

            upgradeButton.style.display="none";

        }

    }else{

        proBadge.textContent="FREE PLAN";

        planText.textContent="FREE";

        accountType.textContent="FREE";

        subscriptionStatus.textContent="Inactive";

        planName.textContent="FREE PLAN";

        planDescription.textContent=

        "Upgrade to ToolBox Pro anytime to unlock premium features.";

        if(upgradeButton){

            upgradeButton.style.display="inline-flex";

        }

    }

}
/* ==========================================
FORMAT MEMBER SINCE
========================================== */

function formatMemberSince(dateString){

    if(!dateString){

        return "Unknown";

    }

    const date=new Date(dateString);

    return date.toLocaleDateString("en-US",{

        year:"numeric",

        month:"long",

        day:"numeric"

    });

}

/* ==========================================
ONLINE STATUS
========================================== */

function updateOnlineStatus(){

    console.log(

        navigator.onLine

        ? "🟢 Online"

        : "🔴 Offline"

    );

}

window.addEventListener(

    "online",

    updateOnlineStatus

);

window.addEventListener(

    "offline",

    updateOnlineStatus

);

updateOnlineStatus();
/* ==========================================
PART 8
GREETING & DASHBOARD STATS
========================================== */

function updateGreeting(){

    const hour=new Date().getHours();

    let greeting="Welcome";

    if(hour<12){

        greeting="🌅 Good Morning";

    }

    else if(hour<18){

        greeting="☀️ Good Afternoon";

    }

    else{

        greeting="🌙 Good Evening";

    }

    if(welcomeText){

        welcomeText.innerHTML=greeting;
    }

}

function updateDashboardStats(){

    const statCards=document.querySelectorAll(".stat-card h2");

    if(statCards.length>=4){

        statCards[0].textContent="50+";

        statCards[1].textContent="5";

        statCards[2].textContent="4";

        statCards[3].textContent=planText.textContent;

    }

}

updateGreeting();

updateDashboardStats();
/* ==========================================
PART 9
PAGE LOADING EFFECT
========================================== */

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});

/* ==========================================
CARD ANIMATION
========================================== */

const cards=document.querySelectorAll(

".glass,.stat-card,.activity-item,.account-item"

);

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{

    threshold:.15

});

cards.forEach(card=>{

    observer.observe(card);

});

/* ==========================================
CONSOLE MESSAGE
========================================== */

console.log(

"🚀 ToolBox Pro Dashboard Ready"

);
/* ==========================================
PART 10
FINAL INITIALIZATION
========================================== */

function initializeDashboard(){

    console.log("🚀 Initializing ToolBox Pro Dashboard...");

    updateGreeting();

    updateDashboardStats();

    updateOnlineStatus();

    checkUser();

}

/* ==========================================
REFRESH EVERY 60 SECONDS
========================================== */

setInterval(()=>{

    checkUser();

},60000);

/* ==========================================
KEYBOARD SHORTCUTS
========================================== */

document.addEventListener("keydown",(e)=>{

    // Ctrl + H = Home
    if(e.ctrlKey && e.key.toLowerCase()==="h"){

        location.href="index.html";

    }

    // Ctrl + L = Logout
    if(e.ctrlKey && e.key.toLowerCase()==="l"){

        e.preventDefault();

        logout();

    }

});

/* ==========================================
PAGE VISIBILITY
========================================== */

document.addEventListener("visibilitychange",()=>{

    if(!document.hidden){

        checkUser();

    }

});

/* ==========================================
START DASHBOARD
========================================== */

window.addEventListener("DOMContentLoaded",()=>{

    initializeDashboard();

});

console.log("✅ ToolBox Pro Dashboard Loaded Successfully");