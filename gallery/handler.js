import { GalleryManager } from "./gallery.manager.js";

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


export async function reRenderGalleryPage(event) {
    event.preventDefault();

    const clickedPageNumber = manager.getClickedPageNumber(event);
    if (!clickedPageNumber) return;

    try {
        const response = await manager.fetchImages(clickedPageNumber);
        const result = await response.json();

        if (response.ok) {
            manager.renderImages(result.objects);
            manager.addPageToUrl(clickedPageNumber);
        } else {
            alert(result.message);
        }
    } catch(e) {
        console.log(e);
    }
}


