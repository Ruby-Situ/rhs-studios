document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript Loaded");
  
    const albums = document.querySelectorAll(".album");
    console.log(`Found ${albums.length} albums`);
  
    // Fetch the list of images from the server
    fetch('/images')
      .then(response => response.json())
      .then(images => {
        albums.forEach((album, albumIndex) => {
          let index = 0;
          const img = album.querySelector(".carousel-image");
  
          // Dynamically set the first image
          img.src = images[index];
  
          console.log(`Album ${albumIndex + 1} loaded`);
  
          const nextButton = album.querySelector(".next");
          const prevButton = album.querySelector(".prev");
  
          // Check if the buttons are found
          console.log("Next Button: ", nextButton);
          console.log("Prev Button: ", prevButton);
  
          nextButton.addEventListener("click", () => {
            console.log("Next button clicked");
            index = (index + 1) % images.length;
            img.src = images[index];
          });
  
          prevButton.addEventListener("click", () => {
            console.log("Prev button clicked");
            index = (index - 1 + images.length) % images.length;
            img.src = images[index];
          });
        });
      })
      .catch(error => {
        console.error("Error fetching image list:", error);
      });
  });
  