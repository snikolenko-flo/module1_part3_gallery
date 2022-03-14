import { wrapNumbersInHtml, wrapUrlsInHtml } from "../htmlWrapping/htmlWrapping.js";
import { fetchImages } from "../dataSubmitting/fetch.js";
import { getClickedPageNumber } from "../handlers/clickHandler.js";
import { UrlManipulationService } from "../../services/url-manipulation.service.js";

const urlService = new UrlManipulationService();

export function renderImages(imagesUrls) {
    const images = document.getElementById('images');
    images.innerHTML = wrapUrlsInHtml(imagesUrls);
}

export function renderPagesList(totalNumberOfPages) {
    const pages = document.getElementById('pages');
    pages.innerHTML = wrapNumbersInHtml(totalNumberOfPages);
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
                urlService.putPageNumberInUrl(clickedPageNumber);
            } else {
                alert(result.message);
            }
        } catch(e) {
            console.log(e);
        }
    }
}