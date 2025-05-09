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
    document.body.style.overflow = 'hidden';  // lock scroll
}


// Close Fullscreen
function closeFullscreen() {
    document.getElementById("fullscreenModal").style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const slideElements = document.querySelectorAll('.slide-up');

    function checkSlide() {
        const triggerBottom = window.innerHeight * 0.9;

        slideElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            const boxBottom = el.getBoundingClientRect().bottom;

            if (boxTop < triggerBottom && boxBottom > 0) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', checkSlide);
    window.addEventListener('load', checkSlide);
});
