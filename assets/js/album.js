// Define albums with image paths
const albums = {
    album1: ['assets/images/Trad.jpg', 'assets/images/shet.jpg'],
    album2: ['assets/images/Trad.jpg', 'assets/images/shet.jpg']
};

// Track the current image index for each album
const albumIndexes = {
    album1: 0,
    album2: 0
};

// Function to change image in the album
function navigate(album, direction) {
    const albumArray = albums[album];
    let currentIndex = albumIndexes[album];

    // Update index
    currentIndex += direction;

    // Wrap around
    if (currentIndex < 0) {
        currentIndex = albumArray.length - 1;
    } else if (currentIndex >= albumArray.length) {
        currentIndex = 0;
    }

    albumIndexes[album] = currentIndex;

    // Dynamically update the image source
    const imageElement = document.getElementById(`image${album.replace('album', '')}`);
    imageElement.src = albumArray[currentIndex];
}

// Initialize images on page load
document.addEventListener('DOMContentLoaded', function() {
    for (let album in albums) {
        const albumArray = albums[album];
        const imageElement = document.getElementById(`image${album.replace('album', '')}`);
        if (imageElement) {
            imageElement.src = albumArray[0];
        }
    }
});
