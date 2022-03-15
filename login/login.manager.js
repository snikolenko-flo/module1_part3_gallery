import { EmailValidationService } from "../services/email-validation.service.js";
import { PasswordValidationService } from "../services/password-validation.serivce.js";
import { ValidationService } from "./validation/validation.service.js";
import { SubmissionService } from "./submission/submission.service.js";
import { UrlManipulationService } from "../services/url-manipulation.service.js";

export class LoginManager {

    constructor() {
        this.emailService = new EmailValidationService();
        this.passwordService = new PasswordValidationService();
        this.validateService = new ValidationService();

        this.service = new SubmissionService();
        this.urlService = new UrlManipulationService();
    }

    checkEmail(formElement, emailErrorElement) {
        const email = formElement.email.value;
        const validationResult = this.emailService.validateEmail(email);
        this.validateService.handleEmailValidationResult(validationResult, emailErrorElement);
    }

    checkPassword(formElement, passwordErrorElement) {
        const password = formElement.password.value;
        const validationResult = this.passwordService.validatePassword(password);
        this.validateService.handlePasswordValidationResult(validationResult, passwordErrorElement);
    }

    isUserDataValid(email, password) {
        const isDataValid = this.service.validateUserData(email, password);
        return isDataValid;
    }

    async loginUser(email, password) {
        try {
            const response = await this.service.fetchUserData(email, password);
            const result = await response.json();

            if (response.ok) {
                this.service.setToken(result.token);

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