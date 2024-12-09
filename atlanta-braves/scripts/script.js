function updateAndLoadPageVisitCount() {
    let pageVisits = localStorage.getItem('pageVisits');
    if (pageVisits === null) {
        pageVisits = 0;
    }
    pageVisits = parseInt(pageVisits) + 1;
    localStorage.setItem('pageVisits', pageVisits);
    document.querySelector('#visit-count').textContent = pageVisits;
}

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    // const nav = document.querySelector('nav');
    const nav = document.querySelector('.animate-me');

    hamburger.addEventListener('click', function () {
        nav.classList.toggle('active');
        hamburger.classList.toggle('open');
    });
});

const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

document.getElementById('lastModified').textContent = document.lastModified;

updateAndLoadPageVisitCount();