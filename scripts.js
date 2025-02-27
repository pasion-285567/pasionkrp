// Map the note contents from individual files
const noteContents = {
    'mahalmoakopanginoon' : mahalmoakopanginoonContent,
    'mahalkitapanginoon' : mahalkitapanginoonContent,
    'symphony': symphonyContent,
    'sofhia': sofhiaContent,
    'panalangin': panalanginContent,
    'parasataong' :parasataongContent,
    'hinditayopwede': hinditayopwedeContent,
    'Imalwayshere' : imalwayshereContent,
    'sangalan' : sangalanContent,
    'illwait' : illwaitContent
};

function openPopup(noteId) {
    const content = noteContents[noteId];
    
    document.getElementById('popup-container').innerHTML = `
        <div class="popup" id="popup">
            <span class="close-btn" onclick="closePopup()">&times;</span>
            ${content}
        </div>
    `;
    
    document.getElementById('popup').style.display = 'block';
    document.getElementById('popup-overlay').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('popup-overlay').style.display = 'none';
}
// For index stuffs
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

window.addEventListener("scroll", function() {
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


// Dark Mode Toggle


const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', darkModeToggle.checked);
    console.log('Dark mode:', darkModeToggle.checked); // Check if the event fires
});
