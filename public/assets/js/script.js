document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  if (!gallery) {
    console.error('Gallery not found');
    return;
  }

  const category = gallery.dataset.category || '';
  if (!category) {
    console.error('No category specified');
    return;
  }

  // Shared lightbox state
  let lightboxOverlay = null;
  let lightboxImages = [];
  let currentImageIndex = 0;

  // Fetch albums for the category
  fetch(`/api/albums?category=${encodeURIComponent(category)}`)
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch albums');
      return response.json();
    })
    .then(data => {
      renderAlbums(data.albums);
    })
    .catch(err => {
      gallery.innerHTML = `<p>Error loading albums: ${err.message}</p>`;
      console.error(err);
    });

  function renderAlbums(albums) {
    if (!albums.length) {
      gallery.innerHTML = '<p>No albums found.</p>';
      return;
    }

    gallery.innerHTML = albums.map(album => `
      <div class="album" tabindex="0" role="button" aria-label="Open album ${album.name}">
        <img src="${album.cover}" alt="Cover image of ${album.name}" />
        <div class="album-title">${album.name}</div>
      </div>
    `).join('');

    const albumElements = gallery.querySelectorAll('.album');
    albumElements.forEach((albumEl, index) => {
      albumEl.addEventListener('click', () => openLightbox(index));
      albumEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });

    function openLightbox(albumIndex) {
      const album = albums[albumIndex];

      fetch(`/api/albums?category=${encodeURIComponent(category)}&album=${encodeURIComponent(album.name)}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch album images');
          return res.json();
        })
        .then(albumData => {
          showLightbox(albumData.images);
        })
        .catch(err => {
          alert('Error loading album images: ' + err.message);
          console.error(err);
        });
    }

    function showLightbox(images) {
      if (!images.length) {
        alert('No images in this album.');
        return;
      }

      lightboxImages = images;
      currentImageIndex = 0;

      if (!lightboxOverlay) {
        lightboxOverlay = document.createElement('div');
        lightboxOverlay.id = 'lightbox-overlay';

        lightboxOverlay.innerHTML = `
          <button id="lightbox-prev" aria-label="Previous image">&#10094;</button>
          <img id="lightbox-img" src="" alt="" />
          <button id="lightbox-next" aria-label="Next image">&#10095;</button>
          <button id="lightbox-close" aria-label="Close lightbox">&times;</button>
        `;

        document.body.appendChild(lightboxOverlay);

        // Event handlers use shared state
        lightboxOverlay.querySelector('#lightbox-prev').addEventListener('click', showPrev);
        lightboxOverlay.querySelector('#lightbox-next').addEventListener('click', showNext);
        lightboxOverlay.querySelector('#lightbox-close').addEventListener('click', closeLightbox);

        // Click outside image closes overlay
        lightboxOverlay.addEventListener('click', (e) => {
          if (e.target === lightboxOverlay) closeLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
          if (!lightboxOverlay || lightboxOverlay.style.visibility !== 'visible') return;
          if (e.key === 'ArrowLeft') showPrev();
          else if (e.key === 'ArrowRight') showNext();
          else if (e.key === 'Escape') closeLightbox();
        });
      }

      updateImage();
      lightboxOverlay.style.visibility = 'visible';
      lightboxOverlay.style.opacity = '1';
    }

    function updateImage() {
      const imgEl = lightboxOverlay.querySelector('#lightbox-img');
      imgEl.src = lightboxImages[currentImageIndex];
      imgEl.alt = `Image ${currentImageIndex + 1} of ${lightboxImages.length}`;
    }

    function showPrev() {
      currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
      updateImage();
    }

    function showNext() {
      currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
      updateImage();
    }

    function closeLightbox() {
      lightboxOverlay.style.visibility = 'hidden';
      lightboxOverlay.style.opacity = '0';
    }
  }
});
