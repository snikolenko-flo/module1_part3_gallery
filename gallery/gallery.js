import { renderGalleryPage } from "/gallery/handler.js";
import { reRenderGalleryPage } from "/gallery/handler.js"
import { checkTokenExists } from "/gallery/handler.js";
import { setTokenExpireTime } from "/gallery/handler.js";

setTokenExpireTime();
checkTokenExists();

await renderGalleryPage();

const pages = document.getElementById('pages');
pages.onclick = await reRenderGalleryPage();