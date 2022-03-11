import {validateEmail} from "/utilities/emailValidation.js";
import {validatePassword} from "/utilities/passwordValidation.js";

export const validateUserInput = (formElement) => {
    return () => {
        const email = formElement.email.value;
        const password = formElement.password.value;

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
}
