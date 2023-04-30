const form = document.getElementById('form');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', event => {
    event.preventDefault();

    validateInput();
})

function validateInput() {
    const emailInput = email.value.trim();
    const usernameInput = username.value.trim();
    const passwordInput = password.value.trim();
    const password2Input = password2.value.trim();

    if (usernameInput === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    if (emailInput === '') {
        setError(email, "Email is required");
    } else if (!isValidEmail(emailInput)) {
        setError(email, "Invalid email address");
    } else {
        setSuccess(email);
    }

    if (passwordInput === '') {
        setError(password, "Password is required");
    } else if (passwordInput.length < 8) {
        setError(password, "Password must be at least 8 characters")
    } else {
        setSuccess(password);
    }

    if (password2Input === '') {
        setError(password2, "Please re-type password");
    }
    else if (passwordInput !== password2Input) {
        setError(password2, "Passwords must match");
    } else {
        setSuccess(password2);
    }
}

function setError(element, msg) {
    const inputCtrl = element.parentElement;
    const errorDisplay = inputCtrl.querySelector('.error');

    errorDisplay.innerText = msg;
    inputCtrl.classList.add('error');
    inputCtrl.classList.remove('success');
}

function setSuccess(element) {
    const inputCtrl = element.parentElement;
    const errorDisplay = inputCtrl.querySelector('.error');

    errorDisplay.innerText = '';
    inputCtrl.classList.add('success');
    inputCtrl.classList.remove('error');
}

function isValidEmail(email) {
    const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email_regex.test(String(email).toLowerCase());
}
