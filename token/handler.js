import { TokenManager } from "./token.manager.js";

const manager = new TokenManager();

export function checkToken() {
    manager.reSetTokenExpireTime();
    manager.checkTokenExists();
}

export function setToken(token) {
    localStorage.setItem('token', token);
    manager.setTokenExpireTime();
}