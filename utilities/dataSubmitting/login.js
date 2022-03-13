import { getPageNumberFromUrl } from "../urlManipulation.js";
import { fetchUserData } from "./fetch.js";
import { setToken } from "../token/setToken.js";

export async function loginUser(email, password) {
    try {
        const response = await fetchUserData(email, password);
        const result = await response.json();
        const token = result.token;

        if (response.ok) {
            setToken(token);

            const pageNumber = getPageNumberFromUrl();

            window.location.href = `/../gallery/gallery.html?page=${pageNumber}`;
        } else {
            alert(result.errorMessage);
        }
    } catch(e) {
        console.log(e);
    }
}