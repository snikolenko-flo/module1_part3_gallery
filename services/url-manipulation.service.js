export class UrlManipulationService {
    getPageNumberFromUrl() {
        const currentUrl = window.location.search;
        const pageNumber = Number(currentUrl.split('?page=')[1]);

        if (pageNumber) {
            return pageNumber;
        } else {
            return 1;
        }
    }

    redirectToPage(pageNumber) {
        window.location.href = `../gallery/gallery.html?page=${pageNumber}`;
    }

    redirectToLoginPage() {
        const pageNumber = this.getPageNumberFromUrl();
        window.location.href = `../login/login.html?page=${pageNumber}`;
    }
}