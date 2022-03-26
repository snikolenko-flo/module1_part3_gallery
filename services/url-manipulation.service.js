export class UrlManipulationService {
    getPageNumberFromUrl() {
        const currentUrl = window.location.search;

        const searchParams = new URLSearchParams(currentUrl);
        const page = searchParams.get('page');

        const pageNumber = Number(page);

        if (pageNumber) {
            return pageNumber;
        } else {
            return 1;
        }
    }

    redirectToPage(pageNumber) {
        window.location.href = `../gallery/gallery.html?page=${pageNumber}`;
    }
}