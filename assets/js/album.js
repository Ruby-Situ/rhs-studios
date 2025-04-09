document.addEventListener("DOMContentLoaded", () => {
    const albums = document.querySelectorAll(".album");
  
    albums.forEach(album => {
      const images = [
        "assets/images/shet.jpg",
        "assets/images/trad.jpg",
        "assets/images/pic03.jpg"
      ];
      let index = 0;
      const img = album.querySelector(".carousel-image");
  
      album.querySelector(".next").addEventListener("click", () => {
        index = (index + 1) % images.length;
        img.src = images[index];
      });
  
      album.querySelector(".prev").addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        img.src = images[index];
      });
    });
  });
  