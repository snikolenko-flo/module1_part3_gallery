import { EmailValidationService } from "../services/email-validation.service.js";
import { PasswordValidationService } from "../services/password-validation.serivce.js";

export class ValidationManager {

    constructor() {
        this.emailService = new EmailValidationService();
        this.passwordService = new PasswordValidationService();
    }

    checkEmail(formElement, emailErrorElement) {
        const email = formElement.email.value;

        const validatedEmail = this.emailService.validateEmail(email);

        if (!validatedEmail.isValid) {
            emailErrorElement.innerHTML = 'Email is not valid!'
        } else {
            emailErrorElement.innerHTML = '';
        }
    }

    checkPassword(formElement, passwordErrorElement) {
        const password = formElement.password.value;

        const validatedPassword = this.passwordService.validatePassword(password);

        if (!validatedPassword.isValid) {
            passwordErrorElement.innerHTML = validatedPassword.error;
        } else {
            passwordErrorElement.innerHTML = '';
        }
    }
}