// export function setToken(token) {
//     localStorage.setItem('token', token);
//     setTokenExpireTime();
// }
//
// function setTokenExpireTime() {
//     const oneMinuteInMs = 60000;
//     const tenMinutes = oneMinuteInMs * 10;
//
//     const tokenExpireTime = Date.now() + tenMinutes;
//     localStorage.setItem('tokenExpireTime', tokenExpireTime);
// }

export function setExpireTimeAfterReloading() {
    const currentTime = Date.now();
    const tokenExpireTime = localStorage.getItem('tokenExpireTime');
    const timeLeft = tokenExpireTime - currentTime;

    setTimeout(() => {
        localStorage.removeItem('token');
    }, timeLeft);
}
