import { EmailValidationService } from "../services/email-validation.service.js";
import { PasswordValidationService } from "../services/password-validation.serivce.js";
import { BASE_URL } from "../data/constants.js";

export class LoginService {
    handleEmailValidationResult(validatedEmail, emailErrorElement) {
        if (!validatedEmail.isValid) {
            emailErrorElement.innerHTML = 'Email is not valid!'
        } else {
            emailErrorElement.innerHTML = '';
        }
    }

    handlePasswordValidationResult(validatedPassword, passwordErrorElement) {
        if (!validatedPassword.isValid) {
            passwordErrorElement.innerHTML = validatedPassword.error;
        } else {
            passwordErrorElement.innerHTML = '';
        }
    }

    validateUserData(email, password) {
        const emailService = new EmailValidationService();
        const passwordService = new PasswordValidationService();

        const validatedEmail = emailService.validateEmail(email);
        const validatedPassword = passwordService.validatePassword(password);

        return validatedEmail.isValid && validatedPassword.isValid;
    }

    async fetchUserData(email, password) {
        const user = {
            email: email,
            password: password
        };

        const url = `${BASE_URL}/login`;

        return await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user)
        });
    }

    setToken(token) {
        localStorage.setItem('token', token);
        this.setTokenExpireTime();
    }

    setTokenExpireTime() {
        const oneMinuteInMs = 60000;
        const tenMinutes = oneMinuteInMs * 10;

        const tokenExpireTime = Date.now() + tenMinutes;
        localStorage.setItem('tokenExpireTime', tokenExpireTime);
    }
}