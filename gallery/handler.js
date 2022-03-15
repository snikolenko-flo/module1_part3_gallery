import { GalleryManager } from "./gallery-manager.js";

const gallery = new GalleryManager();

export async function renderGalleryPage() {
    try {
        const response = await gallery.getImages();
        const images = await response.json();

        if (response.ok) {
            gallery.renderPagesList(images.total);
            gallery.renderImages(images.objects);
        } else {
            alert(result.errorMessage);
        }
    } catch(e) {
        console.log(e);
    }
}