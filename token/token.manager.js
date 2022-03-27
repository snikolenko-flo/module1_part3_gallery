import { UrlManipulationService } from "../services/url-manipulation.service.js";
import { TokenService } from "./token.service.js";

export class TokenManager {
    constructor() {
        this.urlService = new UrlManipulationService();
        this.tokenService = new TokenService();
    }

    redirectToLogin() {
        const pageNumber = this.urlService.getPageNumberFromUrl();
        window.location.href = `../login/login.html?page=${pageNumber}`;
    }

    setTokenExpireTime() {
        const oneMinuteInMs = 60000;
        const tenMinutes = oneMinuteInMs * 10;

        const tokenExpireTime = Date.now() + tenMinutes;
        localStorage.setItem('tokenExpireTime', tokenExpireTime);
    }

    reSetTokenExpireTime() {
        const timeLeft = this.tokenService.getTimeLeft();
        this.tokenService.setExpireTimer(timeLeft);
    }

    checkTokenExists() {
        if (!this.tokenService.tokenExists()) {
            this.redirectToLogin();
        }
    }

    saveToken(token){
        localStorage.setItem('token', token);
    }
}
