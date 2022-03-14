import { EmailValidationService } from "../../services/email-validation.service.js";
import { PasswordValidationService } from "../../services/password-validation.serivce.js";

export function isUserDataValid(email, password) {

    const emailService = new EmailValidationService();
    const passwordService = new PasswordValidationService();

    const validatedEmail = emailService.validateEmail(email);
    const validatedPassword = passwordService.validatePassword(password);

    return validatedEmail.isValid && validatedPassword.isValid;
}