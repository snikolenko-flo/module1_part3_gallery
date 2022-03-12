import { checkEmail } from "/utilities/emailValidation.js";
import { checkPassword } from "/utilities/passwordValidation.js";

export const validateUserInput = (formElement) => {
    return () => {
        const emailError = document.getElementById('emailError');
        checkEmail(formElement, emailError);

        const passwordError = document.getElementById('passwordError');
        checkPassword(formElement, passwordError);
    }
}