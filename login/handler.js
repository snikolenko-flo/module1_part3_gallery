import { ValidationManager } from "./validation/validation.manager.js";
import { SubmissionManager } from "./submission/submission.manager.js";

export const validateUserInput = (formElement) => {
    return () => {
        const manager = new ValidationManager();

        const emailError = document.getElementById('emailError');
        manager.checkEmail(formElement, emailError);

        const passwordError = document.getElementById('passwordError');
        manager.checkPassword(formElement, passwordError);
    }
}

export const submitUserData = () => {
    return async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        const manager = new SubmissionManager();

        if (manager.isUserDataValid(email, password)) {
            await manager.loginUser(email, password);
        }
    }
};