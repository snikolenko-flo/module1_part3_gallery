import { BASE_URL } from "../../urls/urls.js";
import { getPageNumberFromUrl } from "../urlManipulation.js";

export async function fetchUserData(email, password) {
    const user = {
        email: email,
        password: password
    };

    const url = `${BASE_URL}/login`;

    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user)
    });
}

export async function fetchImages(pageNumber) {
    const accessToken = localStorage.getItem('token');
    const url = `${BASE_URL}/gallery?page=${pageNumber}`;

    return await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: accessToken
        }
    });
}