import { setExpireTimeAfterReloading } from "../utilities/token/setToken.js";
import { UrlManipulationService } from "../services/url-manipulation.service.js";
import { renderGalleryPage } from "/gallery/handler.js";
import { reRenderGalleryPage } from "/gallery/handler.js"

const urlService = new UrlManipulationService();

setExpireTimeAfterReloading();

if (!urlService.tokenExists()) {
   urlService.redirectToLoginPage();
}

await renderGalleryPage(); // handler

const pages = document.getElementById('pages');
pages.onclick = await reRenderGalleryPage(); // handler