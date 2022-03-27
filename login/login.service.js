import { BASE_URL } from "../data/constants.js";
import { UrlManipulationService } from "../services/url-manipulation.service.js";
import { GalleryService } from "../gallery/gallery.service.js";

const urlService = new UrlManipulationService();
const galleryService = new GalleryService();

export class LoginService {
    redirectToGallery() {
        const pageNumber = urlService.getPageNumberFromUrl();
        galleryService.redirectToPage(pageNumber);
    }

    handleEmailValidation(validatedEmail, emailErrorElement) {
        if (!validatedEmail.isValid) {
            emailErrorElement.innerHTML = 'Email is not valid!'
        } else {
            emailErrorElement.innerHTML = '';
        }
    }

    handlePasswordValidation(validatedPassword, passwordErrorElement) {
        if (!validatedPassword.isValid) {
            passwordErrorElement.innerHTML = validatedPassword.error;
        } else {
            passwordErrorElement.innerHTML = '';
        }
    }

    validateUserData(email, password) {
        const validatedEmail = this.validateEmail(email);
        const validatedPassword = this.validatePassword(password);

        return validatedEmail.isValid && validatedPassword.isValid;
    }

    async getToken(email, password) {
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

    validateEmail(email) {
        let userEmail = {
            isValid: false
        }

        let regexp = /\S+@\S+\.\S+/;
        const isValid = regexp.test(email);

        if (isValid) {
            userEmail.isValid = true;
        }

        return userEmail;
    }

    validatePassword(p) {
        let error = '';

        let result = {
            isValid: false,
            error: error
        }

        if (p.length < 8) {
            result.error = "Your password must be at least 8 characters.";
        } else if (p.search(/[a-z]/) < 0) {
            result.error = "Your password must contain at least one lowercase letter.";
        } else if (p.search(/[A-Z]/) < 0) {
            result.error = "Your password must contain at least one uppercase letter.";
        } else if (p.search(/[0-9]/) < 0) {
            result.error = "Your password must contain at least one digit.";
        } else {
            result.isValid = true;
        }
        return result;
    }
}