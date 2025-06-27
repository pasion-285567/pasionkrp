import { albumsData } from './albumsData.js';

// Helper: Get album IDs in order
const albumIds = Object.keys(albumsData);

// Render album thumbnails and click handlers
document.querySelectorAll('.album-card').forEach((card, index) => {
    const albumId = albumIds[index];
    const album = albumsData[albumId];
    const coverDiv = card.querySelector('.album-cover');
    if (album && coverDiv) {
        coverDiv.innerHTML = `
            <div class="album-thumbs-grid">
                ${album.previewImages.map(src => `
                    <img src="${src}" alt="" class="album-thumb-img">
                `).join('')}
            </div>
        `;
    }
    card.addEventListener('click', function () {
        openAlbum(albumId);
    });
});

// Album modal logic
function openAlbum(albumId) {
    const album = albumsData[albumId];
    if (album) {
        document.getElementById('albumTitle').textContent = album.title;
        const photosContainer = document.getElementById('albumPhotos');
        photosContainer.innerHTML = album.images.map((src, index) =>
            `<div class="album-photo" onclick="openMedia('${src}', '${album.title} - Photo ${index + 1}')">
                <img src="${src}" alt="Photo ${index + 1}" class="photo-image">
            </div>`
        ).join('');
        openModal('albumModal');
    }
}

// Media viewer logic
function openMedia(src, title) {
    const mediaContent = document.getElementById('mediaContent');
    // Check if src is an image file
    if (/\.(jpg|jpeg|png|gif|webp)$/i.test(src)) {
        mediaContent.innerHTML = `<img src="${src}" alt="${title}" class="fullscreen-media">`;
    } else {
        mediaContent.innerHTML = `<div class="fullscreen-placeholder">${src}</div>`;
    }
    openModal('mediaModal');
}

// Personal Album full screen view
document.querySelectorAll('#album .photo-card').forEach((card, index) => {
    const img = card.querySelector('img');
    const title = card.querySelector('h4') ? card.querySelector('h4').textContent : `Personal Photo ${index + 1}`;
    if (img) {
        card.style.cursor = "pointer";
        card.addEventListener('click', function () {
            openMedia(img.src, title);
        });
    }
});

// Make openAlbum and openMedia available globally if needed
window.openAlbum = openAlbum;
window.openMedia = openMedia;