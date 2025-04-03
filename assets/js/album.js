// Define albums with image paths
const albums = {
    album1: ['assets/images/Trad.jpg', 'assets/images/classic.jpg'],
    album2: ['assets/images/Trad.jpg', 'assets/images/classic.jpg']
};

// Track the current image index for each album
const albumIndexes = {
    album1: 0,  // Start with the first image in album1
    album2: 0   // Start with the first image in album2
};

// Function to change image in the album
function navigate(album, direction) {
    const albumArray = albums[album]; // Get the array of images for the specified album
    let currentIndex = albumIndexes[album]; // Get the current index of the album

    // Update the index based on the direction (next or previous)
    currentIndex += direction;

    // Loop around the index if we go out of bounds
    if (currentIndex < 0) {
        currentIndex = albumArray.length - 1; // Go to the last image if going backward
    } else if (currentIndex >= albumArray.length) {
        currentIndex = 0; // Go back to the first image if going forward past the last image
    }

    // Update the image source and the current index
    albumIndexes[album] = currentIndex;
    console.log(`Navigating to image: ${albumArray[currentIndex]}`);  // Debugging log

    // Get the image element dynamically using album
    const imageElement = document.getElementById(`image${album.replace('album', '')}`);
    imageElement.src = albumArray[currentIndex];  // Dynamically change the src
}

// Initialize albums when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set initial images (first image from each album)
    for (let album in albums) {
        const albumArray = albums[album];
        document.getElementById(`image${album.replace('album', '')}`).src = albumArray[0]; // Set the first image
    }
});
