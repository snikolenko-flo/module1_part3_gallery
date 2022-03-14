import { EmailValidationService } from "../../services/email-validation.service.js";
import { PasswordValidationService } from "../../services/password-validation.serivce.js";
import { getPageNumberFromUrl } from "/utilities/urlManipulation/urlManipulation.js";
import { fetchUserData } from "/utilities/dataSubmitting/fetch.js";
import { setToken } from "/utilities/token/setToken.js";
import { redirectToPage } from "/utilities/urlManipulation/urlManipulation.js";

export class SubmissionManager {
    isUserDataValid(email, password) {
        const emailService = new EmailValidationService();
        const passwordService = new PasswordValidationService();

        const validatedEmail = emailService.validateEmail(email);
        const validatedPassword = passwordService.validatePassword(password);

        return validatedEmail.isValid && validatedPassword.isValid;
    }

    async loginUser(email, password) {
        try {
            const response = await fetchUserData(email, password);
            const result = await response.json();

            if (response.ok) {
                setToken(result.token);

                const pageNumber = getPageNumberFromUrl();
                redirectToPage(pageNumber);
            } else {
                alert(result.errorMessage);
            }
        } catch(e) {
            console.log(e);
        }
    }
}