// Function to change the active image within an album
function changeImage(button, direction) {
    const albumContainer = button.closest('.album-container'); // Find the closest album container
    const images = albumContainer.querySelectorAll('.album-images img'); // Get all images in this album
    let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active')); // Get the current image index

    // Remove the active class from the current image
    images[currentIndex].classList.remove('active');

    // Update the index for the next image
    currentIndex = (currentIndex + direction + images.length) % images.length; // Ensure it wraps around (circular navigation)

    // Add the active class to the next image
    images[currentIndex].classList.add('active');
}

// Initialization for each album (show the first image)
document.querySelectorAll('.album-images img').forEach((img, index) => {
    if (index === 0) {
        img.classList.add('active');
    }
});
