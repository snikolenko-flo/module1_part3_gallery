import { BASE_URL } from "../../data/constants.js";

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