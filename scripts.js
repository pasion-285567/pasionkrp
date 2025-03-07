// For index stuffs

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

window.addEventListener("scroll", function () {
    let navbar = document.getElementById("navbar");
    let heroText = document.getElementById("heroText");
    let navbarLogo = document.getElementById("navbarLogo");

    let scrollPosition = window.scrollY;
    heroText.style.opacity = 1 - scrollPosition / window.innerHeight;
    navbarLogo.style.opacity = scrollPosition / window.innerHeight;

    navbar.classList.toggle("scrolled", scrollPosition > window.innerHeight);
});

// Open Fullscreen
function openFullscreen(imageSrc) {
    document.getElementById("fullscreenImage").src = imageSrc;
    document.getElementById("fullscreenModal").style.display = 'flex';
}

// Close Fullscreen
function closeFullscreen() {
    document.getElementById("fullscreenModal").style.display = 'none';
}