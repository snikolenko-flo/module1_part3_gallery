import { validateEmail } from "./emailValidation.js";
import { validatePassword } from "./passwordValidation.js";
import { loginUser } from "./dataSubmitting/login.js";

export const submitUserData = () => {
    return async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        const validatedEmail = validateEmail(email);
        const validatedPassword = validatePassword(password);

        if (validatedEmail.isValid && validatedPassword.isValid) {
            await loginUser(email, password);
        }
    }
};