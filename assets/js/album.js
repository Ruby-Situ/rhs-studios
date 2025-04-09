document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript Loaded");
  
    const albums = document.querySelectorAll(".album");
    console.log(`Found ${albums.length} albums`);
  
    albums.forEach((album, albumIndex) => {
      const images = [
        "assets/images/shet.jpg",
        "assets/images/micro.jpg",
        "assets/images/Trad.jpg"
      ];
      let index = 0;
      const img = album.querySelector(".carousel-image");
  
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
  });
  