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