import { wrapUrlsInHtml } from "../utilities/htmlWrapping.js";
import { wrapNumbersInHtml } from "../utilities/htmlWrapping.js";
import { setExpireTimeAfterReloading } from "../utilities/token/setToken.js";
import { getPageNumberFromUrl, redirectToLoginPage } from "../utilities/urlManipulation.js";
import { tokenExists } from "../utilities/urlManipulation.js";
import { fetchImages } from "../utilities/dataSubmitting/fetch.js";
import { renderImages } from "../utilities/render/render.js";

setExpireTimeAfterReloading();

if (!tokenExists()) {
   redirectToLoginPage();
}

try {
    const pageNumber = getPageNumberFromUrl();
    const response = await fetchImages(pageNumber);
    const result = await response.json();

    if (response.ok) {
            renderImages(result.objects);

            const totalNumberOfPages = result.total;
            const pages = document.getElementById('pages');
            pages.innerHTML = wrapNumbersInHtml(totalNumberOfPages);
        } else {
            alert(result.errorMessage);
        }
} catch(e) {
    console.log(e);
}

const pages = document.getElementById('pages');

pages.onclick = async(event) => {
    event.preventDefault();

    let clickedPageNumber = event.target.innerText;
    clickedPageNumber = Number(clickedPageNumber);

    if (clickedPageNumber) {
        try {
            const response = await fetchImages(clickedPageNumber);
            const result = await response.json();

            if (response.ok) {
                renderImages(result.objects);

                const urlInAddressBar = `../gallery/gallery.html?page=${clickedPageNumber}`;
                history.replaceState({}, '', urlInAddressBar);
            } else {
                alert(result.message);
            }
        } catch(e) {
            console.log(e);
        }
    }
}
