import { BASE_URL } from "../../urls/urls.js";
import { getPageNumberFromUrl } from "../urlManipulation.js";

export async function loginUser(email, password) {
    try {
        const user = {
            email: email,
            password: password
        };

        const url = `${BASE_URL}/login`;

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user)
        });

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