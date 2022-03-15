import { GalleryManager } from "./gallery.manager.js";
import { UrlManipulationService } from "../services/url-manipulation.service.js";
import { GalleryService } from "./gallery.service.js";

const galleryManager = new GalleryManager();
const urlService = new UrlManipulationService();
const galleryService = new GalleryService();

export async function renderGalleryPage() {
    try {
        const response = await galleryManager.getImages();
        const images = await response.json();

        if (response.ok) {
            galleryManager.renderPagesList(images.total);
            galleryManager.renderImages(images.objects);
        } else {
            alert(images.errorMessage);
        }
    } catch (e) {
        console.log(e);
    }
}

export async function reRenderGalleryPage() {
        return async function(event) {
            event.preventDefault();

            const clickedPageNumber = galleryService.getClickedPageNumber(event);
            if (!clickedPageNumber) return;

            try {
                const response = await galleryManager.fetchImages(clickedPageNumber);
                const result = await response.json();

                if (response.ok) {
                    galleryManager.renderImages(result.objects);
                    urlService.putPageNumberInUrl(clickedPageNumber);
                } else {
                    alert(result.message);
                }
            } catch(e) {
                console.log(e);
            }
        }
}

export function checkTokenExists() {
    if (!urlService.tokenExists()) {
        urlService.redirectToLoginPage();
    }
}

export function setExpireTimeAfterReloading() {
    const currentTime = Date.now();
    const tokenExpireTime = localStorage.getItem('tokenExpireTime');
    const timeLeft = tokenExpireTime - currentTime;

    setTimeout(() => {
        localStorage.removeItem('token');
    }, timeLeft);
}