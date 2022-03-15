import { GalleryManager } from "./gallery.manager.js";
import { UrlManipulationService } from "../services/url-manipulation.service.js";

const manager = new GalleryManager();
const urlService = new UrlManipulationService();

export async function renderGalleryPage() {
    try {
        const response = await manager.getImages();
        const images = await response.json();

        if (response.ok) {
            manager.renderPagesList(images.total);
            manager.renderImages(images.objects);
        } else {
            alert(images.errorMessage);
        }
    } catch(e) {
        console.log(e);
    }
}

export async function reRenderGalleryPage() {
    return async function(event) {
        event.preventDefault();

        const clickedPageNumber = manager.getClickedPageNumber(event);
        if (!clickedPageNumber) return;

        try {
            const response = await manager.fetchImages(clickedPageNumber);
            const result = await response.json();

            if (response.ok) {
                manager.renderImages(result.objects);
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
    if (!manager.tokenExists()) {
        urlService.redirectToLoginPage();
    }
}

export function setTokenExpireTime() {
    const currentTime = Date.now();
    const tokenExpireTime = localStorage.getItem('tokenExpireTime');
    const timeLeft = tokenExpireTime - currentTime;

    setTimeout(() => {
        localStorage.removeItem('token');
    }, timeLeft);
}