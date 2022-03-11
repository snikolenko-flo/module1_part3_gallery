import { validateEmail } from "./emailValidation.js";
import { validatePassword } from "./passwordValidation.js";
import { BASE_URL } from "../urls/urls.js";
import { getPageNumberFromUrl } from "./urlManipulation.js";

export const submitUserData = () => {
    return async (event) => {
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
    }
};