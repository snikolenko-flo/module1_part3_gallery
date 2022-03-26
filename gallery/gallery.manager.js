import { BASE_URL } from "../data/constants.js";
import { GalleryService } from "./gallery.service.js";

export class GalleryManager {
    constructor() {
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

    async fetchImages(pageNumber) {

        const accessToken = localStorage.getItem('token');
        const url = `${BASE_URL}/gallery?page=${pageNumber}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: accessToken
            }
        });

        const result = await response.json();

        if (response.ok) {
            return result;
        } else {
            const error = this.getError(result);
            throw Error(error);
        }
    }

    getError(response) {
        if (response.errorMessage) {
            return response.errorMessage;
        } else {
            return response.message;
        }
    }

    getClickedPageNumber(event) {
        const clickedPageNumber = Number(event.target.innerText);

        if (clickedPageNumber) {
            return clickedPageNumber;
        }
    }

    addPageToUrl(pageNumber) {
        const urlInAddressBar = `../gallery/gallery.html?page=${pageNumber}`;
        history.replaceState({}, '', urlInAddressBar);
    }
}