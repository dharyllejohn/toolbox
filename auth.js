console.log("auth.js loaded");

/* ==========================================
   TOOLBOX PRO AUTH SYSTEM
========================================== */

const msg = document.getElementById("msg");

function showMessage(text, success = false) {
    if (!msg) return;

    msg.innerText = text;
    msg.style.color = success ? "#22c55e" : "#ef4444";
}


/* ==========================================
   LOGIN
========================================== */

async function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        showMessage("Please enter your email and password.");
        return;
    }

    const { error } =
        await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

    if (error) {
        showMessage(error.message);
        return;
    }

    showMessage("Login successful!", true);

    setTimeout(() => {
        window.location.href = HOME_PAGE;
    }, 1000);
}


/* ==========================================
   SIGN UP
========================================== */

async function signup() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        showMessage("Please fill in all fields.");
        return;
    }

    if (password.length < 8) {
        showMessage("Password must be at least 8 characters.");
        return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: window.location.origin + "/auth.html"
        }
    });

    console.log("SIGNUP DATA:", data);
    console.log("SIGNUP ERROR:", error);

    if (error) {
        showMessage(error.message);
        return;
    }

    showMessage(
        "✅ Account created successfully! Check your email.",
        true
    );
}


/* ==========================================
   FORGOT PASSWORD
========================================== */

async function forgotPassword() {

    const email = document.getElementById("email").value.trim();

    if (!email) {
        showMessage("Please enter your email first.");
        return;
    }


    const redirectUrl =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"

        ? "http://127.0.0.1:5500/pages/reset-password.html"

        : "https://toolbox-wheat-seven.vercel.app/pages/reset-password.html";


    console.log("Password Reset URL:", redirectUrl);


    const { error } =
        await supabaseClient.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: redirectUrl
            }
        );


    if (error) {

        showMessage(error.message);
        console.error(error);
        return;

    }


    showMessage(
        "✅ Password reset link has been sent to your email.",
        true
    );
}


/* ==========================================
   LOGOUT
========================================== */

async function logout() {

    await supabaseClient.auth.signOut();

    window.location.href = LOGIN_PAGE;

}


/* ==========================================
   CHECK AUTH
========================================== */

async function checkAuth() {

    const { data, error } =
        await supabaseClient.auth.getSession();

    console.log("SESSION DATA:", data);
    console.log("SESSION ERROR:", error);

}


window.addEventListener(
    "DOMContentLoaded",
    checkAuth
);