import { validateEmail } from "../emailValidation.js";
import { validatePassword } from "../passwordValidation.js";

export function isUserDataValid(email, password) {

    const validatedEmail = validateEmail(email);
    const validatedPassword = validatePassword(password);

    return validatedEmail.isValid && validatedPassword.isValid;
}