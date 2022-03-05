import {BASE_URL} from "../urls/urls.js";

window.onload = async () => {

    const currentTime = Date.now();
    const tokenExpiredTime = localStorage.getItem('tokenExpiredTime');

    const timeLeft = tokenExpiredTime - currentTime;

    setTimeout(() => {
        localStorage.removeItem('token');
    }, timeLeft);

    const accessToken = localStorage.getItem('token');

    if(!accessToken){
        window.location.href = `../auth/login.html`;
    }

    try {

        const currentUrl = window.location.search;
        const pageNumber = currentUrl.split('?page=')[1];

        localStorage.setItem('pageNumber', pageNumber);

        const url = `${BASE_URL}/gallery?page=${pageNumber}`;
        const accessToken = localStorage.getItem('token');

        const response = await fetch(url, {
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

        const totalNumberOfPages = result.total;
        const pages = document.getElementById('pages');
        pages.innerHTML = wrapNumbersInHtml(totalNumberOfPages);

        pages.onclick = async(event) => {
            event.preventDefault();

            const pageNumber = event.target.innerText;
            const url = `${BASE_URL}/gallery?page=${pageNumber}`;

            localStorage.setItem('pageNumber', pageNumber);

            const response = await fetch(url, {
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

            const urlInAddressBar = `../gallery/gallery.html?page=${pageNumber}`;
            history.replaceState({}, '', urlInAddressBar);
        }

    } catch (e) {
        if (e.name === 'Error') {
            alert(e.message);
        } else {
            console.log(e);
        }
    }
}

function wrapUrlsInHtml(urlsList) {
    let images = '';

    urlsList.forEach(function(url) {
        images += `<div class="gallery">
                       <img src="${url}">
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