import { UrlManipulationService } from "../services/url-manipulation.service.js";
import { BASE_URL } from "../data/constants.js";
import { GalleryService } from "./gallery.service.js";

export class GalleryManager {
    constructor() {
        this.urlService = new UrlManipulationService();
        this.galleryService = new GalleryService();
    }

    renderPagesList(totalNumberOfPages) {
        const pages = document.getElementById('pages');
        pages.innerHTML = this.galleryService.wrapNumbersInHtml(totalNumberOfPages);
    }

    renderImages(imagesUrls) {
        const images = document.getElementById('images');
        images.innerHTML = this.galleryService.wrapUrlsInHtml(imagesUrls);
    }

    async getImages() {
        const pageNumber = this.urlService.getPageNumberFromUrl();
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

    tokenExists() {
        const token = localStorage.getItem('token');
        return token;
    }
}