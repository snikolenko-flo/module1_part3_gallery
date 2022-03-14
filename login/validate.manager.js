import { EmailValidationService } from "../services/email-validation.service.js";
import { PasswordValidationService } from "../services/password-validation.serivce.js";
import { ValidateService } from "./validate.service.js";

export class ValidationManager {

    constructor() {
        this.emailService = new EmailValidationService();
        this.passwordService = new PasswordValidationService();
        this.validateService = new ValidateService();
    }

    checkEmail(formElement, emailErrorElement) {
        const email = formElement.email.value;
        const validationResult = this.emailService.validateEmail(email);
        this.validateService.handleValidationResult(validationResult, emailErrorElement);
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