export function setToken(token) {
    localStorage.setItem('token', token);
    setTokenExpireTime();
}

function setTokenExpireTime() {
    const oneMinuteInMs = 60000;
    const tenMinutes = oneMinuteInMs * 10;

    const tokenExpireTime = Date.now() + tenMinutes;
    localStorage.setItem('tokenExpireTime', tokenExpireTime);
}