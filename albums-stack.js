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

    // Set the title of the modal
    document.getElementById('albumModalTitle').textContent = album.title;
    
    // Get the container to display the images
    const albumImagesContainer = document.querySelector('.album-images-container');
    albumImagesContainer.innerHTML = ''; // Clear previous images

    // Add the images to the modal
    album.images.forEach(imageSrc => {
        const imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.alt = "Album Image";
        imgElement.addEventListener('click', () => openFullscreen(imageSrc)); // Open in fullscreen on click
        albumImagesContainer.appendChild(imgElement);
    });
    
    // Display the modal and lock scrolling on the page
    document.getElementById('albumModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Disable body scroll
}

// Function to close the album modal
function closeAlbumModal() {
    document.getElementById('albumModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// You can add more logic here...

document.addEventListener('DOMContentLoaded', function() {
    // Now you can safely call this
    document.querySelector('.album-close-button').addEventListener('click', closeAlbumModal);
});



// Close the modal if background is clicked
window.addEventListener('click', function(event) {
    const modal = document.getElementById('albumModal');
    if (event.target === modal) {
        closeAlbumModal();
    }
});

document.addEventListener('keydown', function(e) {
    const fullscreenModal = document.getElementById('fullscreenModal');
    const albumModal = document.getElementById('albumModal');

    if (e.key === 'Escape') {
        if (fullscreenModal.style.display === 'flex') {
            closeFullscreen();
        } else if (albumModal.style.display === 'block') {
            closeAlbumModal();
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    loadAlbums(); // Assuming you already have this function that loads albums

    // Add event listener to each album
    document.querySelectorAll('.album').forEach(album => {
        album.addEventListener('click', function() {
            const albumId = this.dataset.albumId;
            openAlbumModal(albumId); // Open modal with album data
        });
    });
});
