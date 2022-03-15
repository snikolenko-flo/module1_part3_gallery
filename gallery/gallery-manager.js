import { wrapNumbersInHtml, wrapUrlsInHtml } from "../utilities/htmlWrapping/htmlWrapping.js";
import { fetchImages } from "../utilities/dataSubmitting/fetch.js";
import { UrlManipulationService } from "../services/url-manipulation.service.js";

export class GalleryManager {

    constructor() {
        this.service = new UrlManipulationService();
    }
    renderPagesList(totalNumberOfPages) {
        const pages = document.getElementById('pages');
        pages.innerHTML = wrapNumbersInHtml(totalNumberOfPages);
    }

    renderImages(imagesUrls) {
        const images = document.getElementById('images');
        images.innerHTML = wrapUrlsInHtml(imagesUrls);
    }

    async getImages() {
        const pageNumber = this.service.getPageNumberFromUrl();
        const response = await fetchImages(pageNumber);
        return response;
    }


}