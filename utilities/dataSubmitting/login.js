import { getPageNumberFromUrl } from "../urlManipulation/urlManipulation.js";
import { fetchUserData } from "./fetch.js";
import { setToken } from "../token/setToken.js";
import { redirectToPage } from "../urlManipulation/urlManipulation.js";

export async function loginUser(email, password) {
    try {
        const response = await fetchUserData(email, password);
        const result = await response.json();

        if (response.ok) {
            setToken(result.token);

            const pageNumber = getPageNumberFromUrl();
            redirectToPage(pageNumber);
        } else {
            alert(result.errorMessage);
        }
    } catch(e) {
        console.log(e);
    }
}