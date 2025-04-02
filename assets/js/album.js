// Get all the albums
const albums = document.querySelectorAll('.album');

// Loop through each album and add event listeners for navigation
albums.forEach(album => {
    const leftButton = album.querySelector('.album-nav.left');
    const rightButton = album.querySelector('.album-nav.right');
    const images = album.querySelectorAll('.album-images img');
    
    let currentIndex = 0;  // Track the current image index

    // Function to show the image based on index
    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.remove('active');  // Hide all images
            if (i === index) {
                img.classList.add('active');  // Show the current image
            }
        });
    }

    // Show the initial image
    showImage(currentIndex);

    // Left Button (Previous Image)
    leftButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        showImage(currentIndex);
    });

    // Right Button (Next Image)
    rightButton.addEventListener('click', () => {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        showImage(currentIndex);
    });
});
