import { renderGalleryPage } from "/gallery/handler.js";
import { reRenderGalleryPage } from "/gallery/handler.js"
import { checkToken } from "../token/handler.js";

checkToken();

await renderGalleryPage();

const pages = document.getElementById('pages');
pages.onclick = reRenderGalleryPage;