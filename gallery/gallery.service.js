export class GalleryService {
    getClickedPageNumber(event) {
        const clickedPageNumber = Number(event.target.innerText);

        if (clickedPageNumber) {
            return clickedPageNumber;
        }
    }
}