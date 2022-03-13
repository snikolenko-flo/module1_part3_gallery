import { setExpireTimeAfterReloading } from "../utilities/token/setToken.js";
import { redirectToLoginPage } from "../utilities/urlManipulation/urlManipulation.js";
import { tokenExists } from "../utilities/urlManipulation/urlManipulation.js";
import { renderGalleryPage, reRenderGalleryPage } from "../utilities/render/render.js";

setExpireTimeAfterReloading();

if (!tokenExists()) {
   redirectToLoginPage();
}

await renderGalleryPage();

const pages = document.getElementById('pages');
pages.onclick = await reRenderGalleryPage();