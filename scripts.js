// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Close modals when clicking close button or outside
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function () {
        this.closest('.modal').classList.remove('show');
        document.body.style.overflow = 'auto';
    });
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function (e) {
        if (e.target === this) {
            this.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const hero = document.querySelector('.hero');
    const mainContent = document.getElementById('main-content');
    const navbar = document.getElementById('navbar');
    const discoverBtn = document.getElementById('discoverBtn');

    if (discoverBtn) {
        discoverBtn.addEventListener('click', function (e) {
            e.preventDefault();
            hero.classList.add('hero-fade-out');
            setTimeout(() => {
                hero.style.display = 'none';
                mainContent.classList.add('show');
                // Wait a bit for main-content to fade in, then show navbar
                setTimeout(() => {
                    navbar.classList.add('show');
                }, 100); // slight delay for smoothness
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 700); // match the transition duration
        });
    }
});

