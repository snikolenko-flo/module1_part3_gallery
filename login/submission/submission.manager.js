import { SubmissionService } from "./submission.service.js";
import { UrlManipulationService } from "/services/url-manipulation.service.js";

export class SubmissionManager {
    constructor() {
        this.service = new SubmissionService();
        this.urlService = new UrlManipulationService();
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