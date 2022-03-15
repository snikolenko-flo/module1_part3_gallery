export class GalleryService {
    getClickedPageNumber(event) {
        const clickedPageNumber = Number(event.target.innerText);

        if (clickedPageNumber) {
            return clickedPageNumber;
        }
    }

    wrapUrlsInHtml(urlsList) {
        let images = '';

        urlsList.forEach(function(url) {
            images += `<div class="gallery">
                       <img src="${url}">
                   </div>`;
        });

        return images;
    }

    wrapNumbersInHtml(totalPages) {
        let pagesList = '';

        for (let i=1; i<=totalPages; i++) {
            pagesList += `<a href="">
                          <li>${i}</li>
                      </a>`;
        }

        return pagesList;
    }
}