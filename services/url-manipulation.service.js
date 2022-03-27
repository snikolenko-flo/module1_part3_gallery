export class UrlManipulationService {
    getPageNumberFromUrl() {
        const currentUrl = window.location.search;

        const searchParams = new URLSearchParams(currentUrl);
        const page = searchParams.get('page');

        const pageNumber = parseInt(page);

        if (isNaN(pageNumber)) {
            throw Error('The page number is not a number!');
        }

        if (!isFinite(pageNumber)) {
            throw Error('The page number is not a finite number!');
        }

        return pageNumber;
    }
}