import { TokenManager } from "./token.manager.js";

const manager = new TokenManager();

export function checkToken() {
    manager.reSetTokenExpireTime();
    manager.checkTokenExists();
}

export function setToken(token) {
    manager.saveToken(token);
    manager.setTokenExpireTime();
}