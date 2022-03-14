import { validateEmail } from "../utilities/validation/emailValidation.js";
import { validatePassword } from "../utilities/validation/passwordValidation.js";

export class ValidationManager {
    checkEmail(formElement, emailErrorElement) {
        const email = formElement.email.value;

        const validatedEmail = validateEmail(email);

        if (!validatedEmail.isValid) {
            emailErrorElement.innerHTML = 'Email is not valid!'
        } else {
            emailErrorElement.innerHTML = '';
        }
    }

    checkPassword(formElement, passwordErrorElement) {
        const password = formElement.password.value;

        const validatedPassword = validatePassword(password);

        if (!validatedPassword.isValid) {
            passwordErrorElement.innerHTML = validatedPassword.error;
        } else {
            passwordErrorElement.innerHTML = '';
        }
    }
}