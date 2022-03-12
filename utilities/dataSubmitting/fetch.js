import { BASE_URL } from "../../urls/urls.js";

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