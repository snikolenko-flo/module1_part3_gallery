import { GalleryManager } from "./gallery.manager.js";
import { UrlManipulationService } from "../services/url-manipulation.service.js";

const urlService = new UrlManipulationService();

const manager = new GalleryManager();

export async function renderGalleryPage() {
    try {
        const pageNumber = urlService.getPageNumberFromUrl();
        const images = await manager.fetchImages(pageNumber);

        manager.renderPagesList(images.total);
        manager.renderImages(images.objects);
        manager.addPageToUrl(pageNumber);
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


