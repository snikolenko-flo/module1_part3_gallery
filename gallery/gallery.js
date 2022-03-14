import { setExpireTimeAfterReloading } from "../utilities/token/setToken.js";
import { renderGalleryPage, reRenderGalleryPage } from "../utilities/render/render.js";
import { UrlManipulationService } from "../services/url-manipulation.service.js";

const urlService = new UrlManipulationService();

setExpireTimeAfterReloading();

if (!urlService.tokenExists()) {
   urlService.redirectToLoginPage();
}

await renderGalleryPage();

const pages = document.getElementById('pages');
pages.onclick = await reRenderGalleryPage();