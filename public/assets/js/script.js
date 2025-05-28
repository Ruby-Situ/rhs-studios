const albumContainer = document.getElementById('albums-container');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentAlbum = [];
let currentIndex = 0;

fetch('/api/albums')
  .then(res => res.json())
  .then(albums => {
    for (const [albumName, images] of Object.entries(albums)) {
      if (images.length === 0) continue;

      const albumDiv = document.createElement('div');
      albumDiv.className = 'album';

      const thumb = document.createElement('img');
      thumb.src = `/albums/${albumName}/${images[0]}`;
      albumDiv.appendChild(thumb);

      const title = document.createElement('p');
      title.textContent = albumName;
      albumDiv.appendChild(title);

      albumDiv.addEventListener('click', () => {
        currentAlbum = images.map(img => `/albums/${albumName}/${img}`);
        currentIndex = 0;
        openLightbox();
      });

      albumContainer.appendChild(albumDiv);
    }
  });

function openLightbox() {
  lightbox.classList.add('visible');
  updateLightboxImage();
}

function updateLightboxImage() {
  lightboxImg.src = currentAlbum[currentIndex];
}

function closeLightbox() {
  lightbox.classList.remove('visible');
}

function showPrev() {
  currentIndex = (currentIndex - 1 + currentAlbum.length) % currentAlbum.length;
  updateLightboxImage();
}

function showNext() {
  currentIndex = (currentIndex + 1) % currentAlbum.length;
  updateLightboxImage();
}

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);
