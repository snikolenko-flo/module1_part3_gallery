export function getPageNumberFromUrl() {
    const currentUrl = window.location.search;
    const pageNumber = Number(currentUrl.split('?page=')[1]);

    if (pageNumber) {
        return pageNumber;
    } else {
        return 1;
    }
}

export function redirectToPage(pageNumber) {
    window.location.href = `/../gallery/gallery.html?page=${pageNumber}`;
}

export function redirectToLoginPage() {
    const pageNumber = getPageNumberFromUrl();
    window.location.href = `/../gallery/login/login.html?page=${pageNumber}`;
}

export function tokenExists() {
    const token = localStorage.getItem('token');
    return token;
}