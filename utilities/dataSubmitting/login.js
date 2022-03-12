import { getPageNumberFromUrl } from "../urlManipulation.js";
import { fetchUserData } from "./fetch.js";

export async function loginUser(email, password) {
    try {
        const response = await fetchUserData(email, password);
        const result = await response.json();

        if (response.ok) {
            localStorage.setItem('token', result.token);

            const oneMinuteInMs = 60000;
            const tenMinutes = oneMinuteInMs * 10;

            const tokenExpiredTime = Date.now() + tenMinutes;
            localStorage.setItem('tokenExpiredTime', tokenExpiredTime);

            let pageNumber = getPageNumberFromUrl();

            if (!pageNumber) {
                pageNumber = 1;
            }

            window.location.href = `/../gallery/gallery.html?page=${pageNumber}`;
        } else {
            alert(result.errorMessage);
        }
    } catch(e) {
        console.log(e);
    }
}