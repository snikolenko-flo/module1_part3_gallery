import { wrapNumbersInHtml, wrapUrlsInHtml } from "../htmlWrapping.js";

export function renderImages(imagesUrls) {
    const images = document.getElementById('images');
    images.innerHTML = wrapUrlsInHtml(imagesUrls);
}

export function renderPagesList(totalNumberOfPages) {
    const pages = document.getElementById('pages');
    pages.innerHTML = wrapNumbersInHtml(totalNumberOfPages);
}