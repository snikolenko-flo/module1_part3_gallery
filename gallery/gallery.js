import {BASE_URL} from "../urls/urls.js";
import {wrapUrlsInHtml} from "../utilities/htmlWrapping.js";
import {wrapNumbersInHtml} from "../utilities/htmlWrapping.js";
import {getPageNumberFromUrl} from "../utilities/urlManipulation.js";

const currentTime = Date.now();
const tokenExpiredTime = localStorage.getItem('tokenExpireTime');
const timeLeft = tokenExpiredTime - currentTime;

setTimeout(() => {
    localStorage.removeItem('token');
}, timeLeft);

const accessToken = localStorage.getItem('token');

if (!accessToken) {
    const pageNumber = getPageNumberFromUrl();
    window.location.href = `/../gallery/login/login.html?page=${pageNumber}`;
}

try {
    let pageNumber = getPageNumberFromUrl();

    if (pageNumber) {
        const url = `${BASE_URL}/gallery?page=${pageNumber}`;

        const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: accessToken
                    }
                });

        const result = await response.json();

        if (response.ok) {
            const imagesUrls = result.objects;
            const images = document.getElementById('images');
            images.innerHTML = wrapUrlsInHtml(imagesUrls);

            const totalNumberOfPages = result.total;
            const pages = document.getElementById('pages');
            pages.innerHTML = wrapNumbersInHtml(totalNumberOfPages);
        } else {
            alert(result.errorMessage);
        }
    } else {
        alert('Page number should be an integer!')
    }
} catch(e) {
    console.log(e);
}

const pages = document.getElementById('pages');

pages.onclick = async(event) => {
    event.preventDefault();

    let clickedPageNumber = event.target.innerText;
    clickedPageNumber = Number(clickedPageNumber);

    if (clickedPageNumber) {
        try {
            const url = `${BASE_URL}/gallery?page=${clickedPageNumber}`;
            const accessToken = localStorage.getItem('token');

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: accessToken
                }
            });

            const result = await response.json();

            if (response.ok) {
                const imagesUrls = result.objects;
                const images = document.getElementById('images');
                images.innerHTML = wrapUrlsInHtml(imagesUrls);

                const urlInAddressBar = `../gallery/gallery.html?page=${clickedPageNumber}`;
                history.replaceState({}, '', urlInAddressBar);
            } else {
                alert(result.message);
            }
        } catch(e) {
            console.log(e);
        }
    }
}
