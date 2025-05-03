import { albumsData } from './albumsData.js';

function createAlbumElement(albumId, albumData) {
    return `
        <div class="album" data-album-id="${albumId}">
            <div class="photo-stack">
                <div class="stack-photo photo-3" style="background-image: url('${albumData.previewImages[2]}')"></div>
                <div class="stack-photo photo-2" style="background-image: url('${albumData.previewImages[1]}')"></div>
                <div class="stack-photo photo-1" style="background-image: url('${albumData.previewImages[0]}')"></div>
            </div>
            <div class="album-info">
                <div class="album-title">${albumData.title}</div>
                <div class="album-count">${albumData.count}</div>
            </div>
        </div>
    `;
}

function loadAlbums() {
    const albumsContainer = document.querySelector('.albums-stack');
    const albumsHTML = Object.entries(albumsData)
        .map(([albumId, albumData]) => createAlbumElement(albumId, albumData))
        .join('');
    albumsContainer.innerHTML = albumsHTML;
}

function openAlbumModal(albumId) {
    const album = albumsData[albumId];
    if (!album) return;
    
    document.getElementById('albumModalTitle').textContent = album.title;
    const albumImagesContainer = document.querySelector('.album-images-container');
    albumImagesContainer.innerHTML = '';
    
    album.images.forEach(imageSrc => {
        const imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.alt = "Album Image";
        imgElement.addEventListener('click', () => openFullscreen(imageSrc));
        albumImagesContainer.appendChild(imgElement);
    });
    
    document.getElementById('albumModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAlbumModal() {
    document.getElementById('albumModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', function() {
    loadAlbums();
    
    document.querySelectorAll('.album').forEach(album => {
        album.addEventListener('click', function() {
            const albumId = this.dataset.albumId;
            openAlbumModal(albumId);
        });
    });

    const albumModal = document.getElementById('albumModal');
    window.addEventListener('click', function(event) {
        if (event.target === albumModal) {
            closeAlbumModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && albumModal.style.display === 'block') {
            closeAlbumModal();
        }
    });
});