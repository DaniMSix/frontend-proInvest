const container = document.querySelector(".container");
const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");
const signInButton = document.getElementById("signInButton");
const signUpButton = document.getElementById("signUpButton");

btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");
});

btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
});

signInButton.addEventListener("click", validateSignInForm);
signUpButton.addEventListener("click", validateSignUpForm);

async function validateSignInForm() {
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;

    if (!email || !validateEmail(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return;
    }

    if (!password) {
        alert("Por favor, ingrese una contraseña.");
        return;
    }

    try {
        const response = await fetch('API');
        const users = await response.json();

        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert("Inicio de sesión exitoso!");
        } else {
            alert("Correo electrónico o contraseña incorrectos.");
        }
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        alert("Hubo un problema al intentar iniciar sesión. Por favor, inténtelo de nuevo más tarde.");
    }
}

async function validateSignUpForm() {
    const name = document.getElementById("signUpName").value;
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;

    if (!name) {
        alert("Por favor, ingrese su nombre.");
        return;
    }

    if (!email || !validateEmail(email)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        return;
    }

    if (!password || password.length < 6) {
        alert("Por favor, ingrese una contraseña de al menos 6 caracteres.");
        return;
    }

    try {
        const response = await fetch('API..');
        const users = await response.json();

        const userExists = users.some(user => user.email === email);

        if (userExists) {
            alert("Este correo electrónico ya está registrado.");
        } else {
    
            alert("Registro exitoso!");
        }
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        alert("Hubo un problema al intentar registrarse. Por favor, inténtelo de nuevo más tarde.");
    }
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}
