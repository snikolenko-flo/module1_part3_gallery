export function wrapUrlsInHtml(urlsList) {
    let images = '';

    urlsList.forEach(function(url) {
        images += `<div class="gallery">
                       <img src="${url}">
                   </div>`;
    });

    return images;
}

export function wrapNumbersInHtml(totalPages) {
    let pagesList = '';

    for (let i=1; i<=totalPages; i++) {
        let li = `<a href=""><li>${i}</li></a>`;
        pagesList += li;
    }

    return pagesList;
}