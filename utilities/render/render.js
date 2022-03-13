import { wrapUrlsInHtml } from "../htmlWrapping.js";

export function renderImages(imagesUrls) {
    const images = document.getElementById('images');
    images.innerHTML = wrapUrlsInHtml(imagesUrls);
}