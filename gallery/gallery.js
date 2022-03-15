import { setExpireTimeAfterReloading } from "../utilities/token/setToken.js";
import { renderGalleryPage } from "/gallery/handler.js";
import { reRenderGalleryPage } from "/gallery/handler.js"
import { checkTokenExists } from "/gallery/handler.js";

setExpireTimeAfterReloading();

checkTokenExists(); // handler

await renderGalleryPage(); // handler

const pages = document.getElementById('pages');
pages.onclick = await reRenderGalleryPage(); // handler