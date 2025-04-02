// Define albums with images
const albums = {
    album1: ['assets/images/Trad.jpg', 'assets/images/classic.jpg'],
    album2: ['assets/images/Trad.jpg', 'assets/images/classic.jpg']
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

    // Update index based on the navigation direction
    currentIndex += direction;

    // Loop around the index if we go out of bounds
    if (currentIndex < 0) {
        currentIndex = albumArray.length - 1; // Go to the last image
    } else if (currentIndex >= albumArray.length) {
        currentIndex = 0; // Go back to the first image
    }

    // Update the image source and the index
    albumIndexes[album] = currentIndex;
    document.getElementById(`image${album.replace('album', '')}`).src = `${album}/${albumArray[currentIndex]}`;
}

// Initialize albums when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set initial images
    for (let album in albums) {
        const albumArray = albums[album];
        document.getElementById(`image${album.replace('album', '')}`).src = `${album}/${albumArray[0]}`;
    }
});
