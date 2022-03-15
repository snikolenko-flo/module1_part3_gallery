import { wrapNumbersInHtml, wrapUrlsInHtml } from "../utilities/htmlWrapping/htmlWrapping.js";
import { UrlManipulationService } from "../services/url-manipulation.service.js";
import { BASE_URL } from "../data/constants.js";

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
        const response = await this.fetchImages(pageNumber);
        return response;
    }

    async fetchImages(pageNumber) {
        const accessToken = localStorage.getItem('token');
        const url = `${BASE_URL}/gallery?page=${pageNumber}`;

        return await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: accessToken
            }
        });
    }
}