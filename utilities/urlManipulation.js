export function getPageNumberFromUrl() {
    const currentUrl = window.location.search;
    let pageNumber = currentUrl.split('?page=')[1];

    pageNumber = Number(pageNumber);

    if(pageNumber) {
        return pageNumber;
    } else {
        return undefined;
    }
}