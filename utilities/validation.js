import { checkEmail } from "/utilities/emailValidation.js";
import { validatePassword } from "/utilities/passwordValidation.js";

export const validateUserInput = (formElement) => {
    return () => {

        const emailError = document.getElementById('emailError');
        checkEmail(formElement, emailError);

        const password = formElement.password.value;

        const validatedPassword = validatePassword(password);
        const passwordError = document.getElementById('passwordError');

        if (!validatedPassword.isValid) {
            passwordError.innerHTML = validatedPassword.errors.join("<p>");
        } else {
            passwordError.innerHTML = '';
        }
    }
}