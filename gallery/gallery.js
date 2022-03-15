import { renderGalleryPage } from "/gallery/handler.js";
import { reRenderGalleryPage } from "/gallery/handler.js"
import { checkTokenExists } from "/gallery/handler.js";
import { setExpireTimeAfterReloading } from "/gallery/handler.js";

setExpireTimeAfterReloading();

checkTokenExists();

await renderGalleryPage();

const pages = document.getElementById('pages');
pages.onclick = await reRenderGalleryPage();