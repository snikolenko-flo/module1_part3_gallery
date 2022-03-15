import { EmailValidationService } from "../services/email-validation.service.js";
import { PasswordValidationService } from "../services/password-validation.serivce.js";
import { UrlManipulationService } from "../services/url-manipulation.service.js";

import { LoginService } from "./login.service.js";

export class LoginManager {

    constructor() {
        this.loginService = new LoginService();
        this.emailService = new EmailValidationService();
        this.passwordService = new PasswordValidationService();
        this.urlService = new UrlManipulationService();
    }

    checkEmail(formElement, emailErrorElement) {
        const email = formElement.email.value;
        const validationResult = this.emailService.validateEmail(email);
        this.loginService.handleEmailValidationResult(validationResult, emailErrorElement);
    }

    checkPassword(formElement, passwordErrorElement) {
        const password = formElement.password.value;
        const validationResult = this.passwordService.validatePassword(password);
        this.loginService.handlePasswordValidationResult(validationResult, passwordErrorElement);
    }

    isUserDataValid(email, password) {
        const isDataValid = this.loginService.validateUserData(email, password);
        return isDataValid;
    }

    async loginUser(email, password) {
        try {
            const response = await this.loginService.fetchUserData(email, password);
            const result = await response.json();

            if (response.ok) {
                this.loginService.setToken(result.token);

                const pageNumber = this.urlService.getPageNumberFromUrl();
                this.urlService.redirectToPage(pageNumber);
            } else {
                alert(result.errorMessage);
            }
        } catch(e) {
            console.log(e);
        }
    }
}