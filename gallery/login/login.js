import {BASE_URL} from "../../urls/urls.js";
import {validateEmail} from "../../utilities/emailValidation.js";
import {validatePassword} from "../../utilities/passwordValidation.js";
import {getPageNumberFromUrl} from "../../utilities/urlManipulation.js";

const loginForm = document.getElementById('loginForm');

loginForm.onchange = () => {

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    const validatedEmail = validateEmail(email);
    const emailError = document.getElementById('emailError');

    if (!validatedEmail.isValid) {
        emailError.innerHTML = 'Email is not valid!'
    } else {
        emailError.innerHTML = '';
    }

    const validatedPassword = validatePassword(password);
    const passwordError = document.getElementById('passwordError');

    if (!validatedPassword.isValid) {
        passwordError.innerHTML = validatedPassword.errors.join("<p>");
    } else {
        passwordError.innerHTML = '';
    }
}

loginForm.onsubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const validatedEmail = validateEmail(email);
    const validatedPassword = validatePassword(password);

    if (validatedEmail.isValid && validatedPassword.isValid) {
        try {
            const user = {
                email: email,
                password: password
            };

            const url = `${BASE_URL}/login`;

            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(user)
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('token', result.token);

                const oneMinuteInMs = 60000;
                const tenMinutes = oneMinuteInMs * 10;

                const tokenExpiredTime = Date.now() + tenMinutes;
                localStorage.setItem('tokenExpiredTime', tokenExpiredTime);

                let pageNumber = getPageNumberFromUrl();

                if (!pageNumber) {
                    pageNumber = 1;
                }

                window.location.href = `/../gallery/gallery.html?page=${pageNumber}`;
            } else {
                alert(result.errorMessage);
            }
        } catch(e) {
            console.log(e);
        }
    }
};