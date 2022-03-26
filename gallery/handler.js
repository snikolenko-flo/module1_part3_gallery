import { GalleryManager } from "./gallery.manager.js";
import { UrlManipulationService } from "../services/url-manipulation.service.js";

const urlService = new UrlManipulationService();

const manager = new GalleryManager();

export function setTokenExpireTime() {
    const timeLeft = manager.getTimeLeft();
    manager.setExpireTimer(timeLeft);
}

export function checkTokenExists() {
    if (!manager.tokenExists()) {
        manager.redirectToLogin();
    }
}

export async function renderGalleryPage() {
    try {
        const pageNumber = urlService.getPageNumberFromUrl();
        const images = await manager.fetchImages(pageNumber);

        manager.renderPagesList(images.total);
        manager.renderImages(images.objects);
    } catch(e) {
        if ( !(e instanceof TypeError) ) alert(e);
    }
}

export async function reRenderGalleryPage(event) {
    event.preventDefault();

    const clickedPageNumber = manager.getClickedPageNumber(event);
    if (!clickedPageNumber) return;

    try {
        const images = await manager.fetchImages(clickedPageNumber);
        manager.renderImages(images.objects);
        manager.addPageToUrl(clickedPageNumber);
    } catch(e) {
        alert(e);
    }
}


