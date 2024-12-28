const body = document.querySelector('body');
const themeIcon = document.getElementById('themeIcon');
const toggleParagraph = document.getElementById('toggle-paragraph');
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const eyeIcon = document.getElementById("eye-icon");
const loginPassword = document.getElementById("login-password");
const validationMessageEl = document.getElementById("validationMessage");

// Dark Mode and Light Mode Toggle
themeIcon.addEventListener("click", function () {
    themeIcon.classList.toggle("bi-moon");
    if (themeIcon.classList.toggle("bi-brightness-high-fill")) {
        body.style.background = "black";
        body.style.color = "white";
        document.getElementById("email").style.color = "white";
        document.getElementById("login-password").style.color = "white";
        toggleParagraph.textContent = "Toggle Light Mode";
        toggleParagraph.style.display = "block";
    } else {
        body.style.background = "white";
        body.style.color = "black";
        document.getElementById("email").style.color = "black";
        document.getElementById("login-password").style.color = "black";
        toggleParagraph.textContent = "Toggle Dark Mode";
        toggleParagraph.style.display = "block";
    }
});

// Showing dark mode light mode title on hover
themeIcon.addEventListener("mouseover", () => {
    toggleParagraph.style.display = "block";
});

// Hiding dark mode light mode title on mouseout
themeIcon.addEventListener("mouseout", () => {
    setTimeout(function () {
        toggleParagraph.style.display = "none";
    }, 0.01 * 1000);
});

// Password Show Hide icon toggle
eyeIcon.onclick = () => {
    if (loginPassword.type == "password") {
        loginPassword.type = "text";
        eyeIcon.classList.add("fa-eye")
        eyeIcon.classList.remove("fa-eye-slash")
        eyeIcon.style.color = "green"
    }
    else {
        loginPassword.type = "password"
        eyeIcon.classList.remove("fa-eye")
        eyeIcon.classList.add("fa-eye-slash")
        eyeIcon.style.color = "red"
    }
}


// Redirect to signup page
signupBtn.onclick = () => {
    window.location.href = "../signup/signup.html";
}

// User login function:
function userLogin() {
    const userEmail = document.getElementById("email").value;
    const loginPassword = document.getElementById("login-password").value;

    // Retrive userdata from LocalStorage
    const userData = JSON.parse(localStorage.getItem("userData")) || [];

    if (userEmail.toLowerCase() === userData.email && loginPassword === userData.password) {
        window.open("../home/index.html", "_self");
    }
    else {
        validationMessageEl.style.display = "block";
    }
}

// Calling user login function
loginBtn.onclick = () => {
    userLogin();
}