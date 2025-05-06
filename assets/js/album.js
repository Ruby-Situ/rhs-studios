document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display album buttons
    fetch('/api/albums')
        .then(response => response.json())
        .then(albums => {
            const albumButtonsDiv = document.getElementById('album-buttons');
            albums.forEach(album => {
                const albumButton = document.createElement('button');
                albumButton.textContent = album;
                albumButton.onclick = () => loadAlbum(album);
                albumButtonsDiv.appendChild(albumButton);
            });
        })
        .catch(error => console.error('Error fetching albums:', error));
});

let currentAlbum = '';
let currentImageIndex = 0;
let albumImages = [];

function loadAlbum(album) {
    currentAlbum = album;
    currentImageIndex = 0; // Reset to the first image
    const albumNameElement = document.getElementById('album-name');
    const imageContainer = document.getElementById('image-container');
    const imageGallery = document.getElementById('image-gallery');

    // Clear previous images
    imageContainer.innerHTML = '';

    // Fetch images for the selected album
    fetch(`/api/album/${album}`)
        .then(response => response.json())
        .then(data => {
            albumImages = data.images; // Store images for this album
            albumNameElement.textContent = album; // Display album name
            showImage(); // Show the first image
            imageGallery.style.display = 'block'; // Show the gallery
        })
        .catch(error => console.error('Error fetching images:', error));
}

function showImage() {
    const imageContainer = document.getElementById('image-container');
    const image = albumImages[currentImageIndex];
    if (image) {
        const imgElement = document.createElement('img');
        imgElement.src = image.url;
        imgElement.alt = image.filename;
        imgElement.style.maxWidth = '100%';
        imgElement.style.height = 'auto';
        imageContainer.innerHTML = ''; // Clear previous image
        imageContainer.appendChild(imgElement); // Add new image
    }
}

function changeImage(direction) {
    currentImageIndex += direction;

    // If we've reached the end or beginning of the images array, loop around
    if (currentImageIndex < 0) {
        currentImageIndex = albumImages.length - 1;
    } else if (currentImageIndex >= albumImages.length) {
        currentImageIndex = 0;
    }

    showImage(); // Display the next/previous image
}
