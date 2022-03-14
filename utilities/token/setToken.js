export function setExpireTimeAfterReloading() {
    const currentTime = Date.now();
    const tokenExpireTime = localStorage.getItem('tokenExpireTime');
    const timeLeft = tokenExpireTime - currentTime;

    setTimeout(() => {
        localStorage.removeItem('token');
    }, timeLeft);
}
