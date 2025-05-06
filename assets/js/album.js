document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/images")
    .then((res) => res.json())
    .then((albumsData) => {
      const container = document.createElement("div");
      container.id = "albums-container";
      document.body.appendChild(container);

      Object.entries(albumsData).forEach(([folderName, images]) => {
        let index = 0;

        const album = document.createElement("div");
        album.className = "album";

        const title = document.createElement("h2");
        title.textContent = folderName;

        const carousel = document.createElement("div");
        carousel.className = "carousel";

        const prevBtn = document.createElement("button");
        prevBtn.textContent = "‹";

        const img = document.createElement("img");
        img.className = "carousel-image";
        img.src = images[index];

        const nextBtn = document.createElement("button");
        nextBtn.textContent = "›";

        prevBtn.addEventListener("click", () => {
          index = (index - 1 + images.length) % images.length;
          img.src = images[index];
        });

        nextBtn.addEventListener("click", () => {
          index = (index + 1) % images.length;
          img.src = images[index];
        });

        carousel.appendChild(prevBtn);
        carousel.appendChild(img);
        carousel.appendChild(nextBtn);

        album.appendChild(title);
        album.appendChild(carousel);
        container.appendChild(album);
      });
    })
    .catch((err) => console.error("Failed to load images:", err));
});
