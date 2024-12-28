const body = document.querySelector('body');
const themeIcon = document.getElementById('themeIcon');
const toggleParagraph = document.getElementById('toggle-paragraph');
const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");
const eyeIcon = document.getElementById("eye-icon");
const password = document.getElementById("password");
const validationMessage = document.getElementById("validationMessage");

const userData = [];
const userInput = {};

// Dark Mode and Light Mode Toggle
themeIcon.addEventListener("click", function () {
    themeIcon.classList.toggle("bi-moon");
    if (themeIcon.classList.toggle("bi-brightness-high-fill")) {
        body.style.background = "black";
        body.style.color = "white";
        document.getElementById("username").style.color = "white";
        document.getElementById("email").style.color = "white";
        document.getElementById("password").style.color = "white";
        toggleParagraph.textContent = "Toggle Light Mode";
        toggleParagraph.style.display = "block";
    } else {
        body.style.background = "white";
        body.style.color = "black";
        document.getElementById("username").style.color = "black";
        document.getElementById("email").style.color = "black";
        document.getElementById("password").style.color = "black";
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
    if (password.type == "password") {
        password.type = "text";
        eyeIcon.classList.add("fa-eye");
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.style.color = "green";
    }
    else {
        password.type = "password";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
        eyeIcon.style.color = "red";
    }
}

// Redirect to login page
loginBtn.onclick = () => {
    window.location.href = "../login/login.html";
}

// user profile image upload
function handleImage(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (!uploadedImage) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);

    fileReader.onload = function () {
        const avatarPreviewImage = document.querySelector(".avatar-preview-image");
        const avatarDefaultIcon = document.querySelector(".avatar-default-icon");

        avatarPreviewImage.src = this.result;
        avatarPreviewImage.classList.remove("hidden");
        avatarPreviewImage.style.display = "block";
        avatarDefaultIcon.classList.add("hidden");
        avatarDefaultIcon.style.display = "none";

        userInput.avatar = this.result;
    };
}

// Take user data
function userSignup() {
    const userName = document.getElementById("username").value;
    const userEmail = document.getElementById("email").value;
    const loginPassword = document.getElementById("password").value;

    // Avatar Upload Validation
    if (!userInput.avatar) {
        validationMessage.textContent = "Upload the profile image!";
        validationMessage.style.display = "block";
        return;
    }

    // Name Input Field Validation
    if (userName.length > 3 && userName.length < 11) {
        userInput.username = userName;
    } else {
        // alert("Name is not valid");
        validationMessage.textContent = "Username is not valid!";
        validationMessage.style.display = "block";
        return;
    }

    // // Email Input Field Validation
    const emailRegex = /^[a-zA-Z0-9]+[a-zA-Z0-9._]*@[a-zA-Z0-9]+\.(com|in)$/i;

    if (emailRegex.test(email.value)) {
        userInput.email = userEmail.toLowerCase();
    } else {
        // alert("Email is not valid");
        validationMessage.textContent = "Email is not valid!";
        validationMessage.style.display = "block";
        return;
    }

    // // Password Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$~])[A-Za-z\d@#$~]+$/;
    if (password.value.length >= 8 && passwordRegex.test(password.value)) {
        userInput.password = loginPassword
    } else {
        // alert("Password is not valid");
        validationMessage.textContent = "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character!";
        validationMessage.style.display = "block";
        return;
    }

    return userInput;

}

// Calling signup function
signupBtn.onclick = () => {
    const userdata = userSignup();
    if (userdata) {
        localStorage.setItem("userData", JSON.stringify(userdata));
        window.location.href = "../login/login.html";
    }
}

