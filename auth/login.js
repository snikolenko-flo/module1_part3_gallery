import {validateEmail} from "../utilities/emailValidation.js";
import {validatePassword} from "../utilities/passwordValidation.js";
import {BASE_URL} from "../urls/urls.js";
import {HOST} from "../urls/urls.js";

loginForm.onchange = () => {

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    const isValidatedEmail = validateEmail(email);

    if (!isValidatedEmail) {
        emailError.innerHTML = 'Email is not valid!'
    } else {
        emailError.innerHTML = '';
    }

    const validatedPassword = validatePassword(password);

    if (!validatedPassword.isValid) {
        passwordError.innerHTML = validatedPassword.errors.join("\n");
    } else {
        passwordError.innerHTML = '';
    }
}

loginForm.onsubmit = async (event) => {
    event.preventDefault();

    const email = event.target['email'].value;
    const password = event.target['password'].value;

    const isValidatedEmail = validateEmail(email);
    const validatedPassword = validatePassword(password);

    if (isValidatedEmail && validatedPassword.isValid) {

        let user = {
            email: email,
            password: password
        };

        const loginUrl = `${BASE_URL}/login`;

        let response = await fetch(loginUrl, {
            method: 'POST',
            body: JSON.stringify(user)
        });

        let result = await response.json();

        if (result.errorMessage) {
            alert(result.errorMessage);
        } else {
            localStorage.setItem('token', result.token);
            alert('You are successfully logged in!');
        }

        const accessToken = localStorage.getItem('token');
        let pageNumber = localStorage.getItem('pageNumber');

        if (pageNumber === 'undefined' || pageNumber === 'null') {
            pageNumber = 1;
        }

        if (accessToken.toString() !== undefined || accessToken.toString() !== null ) {
            window.location.href = `${HOST}/gallery/gallery.html?page=${pageNumber}`;

            const oneMinute = 60000;
            const tenMinutes = oneMinute * 10;

            const deadline = Date.now() + tenMinutes;
            localStorage.setItem('deadline', deadline);
        }
    }
};