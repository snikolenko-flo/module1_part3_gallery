import {BASE_URL} from "../urls/urls.js";
import {HOST} from "../urls/urls.js";

window.onload = async () => {

    const currentTime = Date.now();
    const deadline = localStorage.getItem('deadline');

    const timeLeft = deadline - currentTime;

    setTimeout(() => {
        localStorage.removeItem('token');
        window.location.href = `../auth/login.html`;
    }, timeLeft);

    try {

        const currentUrl = window.location.search;
        const pageNumber = currentUrl.split('?page=')[1];

        localStorage.setItem('pageNumber', pageNumber);

        const galleryUrl = `${BASE_URL}/gallery?page=${pageNumber}`;
        const accessToken = localStorage.getItem('token');

        const response = await fetch(galleryUrl, {
                method: 'GET',
                headers: {
                    Authorization: accessToken
                }
            });

        if (response.status === 400) {
            const error = new Error('Page not found!');
            throw error;
        }

        const result = await response.json();
        const imagesUrls = result.objects;

        const images = document.getElementById('images');
        images.innerHTML = wrapUrlsInHtml(imagesUrls);

        const pagesNumber = result.total;
        const pages = document.getElementById('pages');
        pages.innerHTML = wrapNumbersInHtml(pagesNumber);

        pages.onclick = async(event) => {
            event.preventDefault();

            const pageNumber = event.target.innerText;
            const galleryUrl = `${BASE_URL}/gallery?page=${pageNumber}`;
            localStorage.setItem('pageNumber', pageNumber);

            const response = await fetch(galleryUrl, {
                method: 'GET',
                headers: {
                    Authorization: accessToken
                }
            });

            if (response.status === 400) {
                const error = new Error('Page not found!');
                throw error;
            }

            const url = `${HOST}/gallery/gallery.html?page=${pageNumber}`;
            history.replaceState({}, '', url);

            const result = await response.json();
            const imagesUrls = result.objects;

            let images = document.getElementById('images');
            images.innerHTML = wrapUrlsInHtml(imagesUrls);
        }
    } catch (e) {
        alert(e.message);
    }
}

function wrapUrlsInHtml(urlsList) {
    let images = '';

    urlsList.forEach(function(url) {
        images += `<div class="gallery">
                       <img src="${url}" alt="Cinque Terre" width="600" height="400">
                   </div>`;
    });

    return images;
}

function wrapNumbersInHtml(totalPages) {
    let pagesList = '';

    for (let i=1; i<=totalPages; i++) {
        let li = `<a href=""><li>${i}</li></a>`;
        pagesList += li;
    }

    return pagesList;
}