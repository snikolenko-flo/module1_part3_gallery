import { ValidationManager } from "./validate.manager.js";

export const validateUserInput = (formElement) => {
    return () => {
        const manager = new ValidationManager();

        const emailError = document.getElementById('emailError');
        manager.checkEmail(formElement, emailError);

        const passwordError = document.getElementById('passwordError');
        manager.checkPassword(formElement, passwordError);
    }
}