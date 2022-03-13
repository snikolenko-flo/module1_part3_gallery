import { wrapNumbersInHtml, wrapUrlsInHtml } from "../htmlWrapping.js";
import { getPageNumberFromUrl, putPageNumberInUrl } from "../urlManipulation.js";
import { fetchImages } from "../dataSubmitting/fetch.js";
import { getClickedPageNumber } from "../clickHandler.js";

export function renderImages(imagesUrls) {
    const images = document.getElementById('images');
    images.innerHTML = wrapUrlsInHtml(imagesUrls);
}

export function renderPagesList(totalNumberOfPages) {
    const pages = document.getElementById('pages');
    pages.innerHTML = wrapNumbersInHtml(totalNumberOfPages);
}

export async function renderGalleryPage() {
    try {
        const pageNumber = getPageNumberFromUrl();
        const response = await fetchImages(pageNumber);
        const result = await response.json();

        if (response.ok) {
            renderPagesList(result.total);
            renderImages(result.objects);
        } else {
            alert(result.errorMessage);
        }
    } catch(e) {
        console.log(e);
    }
}

export async function reRenderGalleryPage() {
    return async function(event) {
        event.preventDefault();

        const clickedPageNumber = getClickedPageNumber(event);
        if (!clickedPageNumber) return;

        try {
            const response = await fetchImages(clickedPageNumber);
            const result = await response.json();

            if (response.ok) {
                renderImages(result.objects);
                putPageNumberInUrl(clickedPageNumber);
            } else {
                alert(result.message);
            }
        } catch(e) {
            console.log(e);
        }
    }
}