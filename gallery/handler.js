import { fetchImages } from "../utilities/dataSubmitting/fetch.js";
import { renderImages, renderPagesList} from "../utilities/render/render.js";
import { UrlManipulationService } from "../services/url-manipulation.service.js";

// Temporary service. Need to remove it.
const urlService = new UrlManipulationService();

export async function renderGalleryPage() {
    try {
        const pageNumber = urlService.getPageNumberFromUrl();
        const response = await fetchImages(pageNumber);
        const result = await response.json();

        if (response.ok) {
            renderPagesList(result.total);
            renderImages(result.objects);
        } else {
            alert(result.errorMessage);
        }
    } catch(e) {
        console.log(e);
    }
}