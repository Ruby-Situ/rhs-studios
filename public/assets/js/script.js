document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  if (!gallery) {
    console.error('Gallery container not found');
    return;
  }

  const category = gallery.dataset.category || '';
  if (!category) {
    console.error('No category specified in data-category attribute');
    return;
  }

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

  // Function to render albums into the gallery
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

    // Add click handlers to albums
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

    // Store albums in closure for lightbox navigation
    let currentAlbumIndex = 0;

    // Lightbox overlay element creation
    let lightboxOverlay = null;

    // Open lightbox function
    function openLightbox(albumIndex) {
      currentAlbumIndex = albumIndex;
      const album = albums[albumIndex];

      // Fetch images inside the album folder
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

    // Show lightbox with images array
    function showLightbox(images) {
      if (!images.length) {
        alert('No images in this album.');
        return;
      }

      let currentImageIndex = 0;

      if (!lightboxOverlay) {
        lightboxOverlay = document.createElement('div');
        lightboxOverlay.id = 'lightbox-overlay';

        lightboxOverlay.innerHTML = `
            <button id="lightbox-back" aria-label="Go back to Horses.html">← Go Back</button>
            <img id="lightbox-img" src="" alt="" />
            <button id="lightbox-close" aria-label="Close lightbox">&times;</button>
        `;

        document.body.appendChild(lightboxOverlay);

        lightboxOverlay.querySelector('#lightbox-back').addEventListener('click', () => {
          window.location.href = 'Horses.html';  // Change this to your desired page
        });
        lightboxOverlay.querySelector('#lightbox-close').addEventListener('click', closeLightbox);

        // Close on click outside image
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

      const imgEl = lightboxOverlay.querySelector('#lightbox-img');

      function updateImage() {
        imgEl.src = images[currentImageIndex];
        imgEl.alt = `Image ${currentImageIndex + 1} of ${images.length}`;
      }

      function showPrev() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage();
      }

      function showNext() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
      }

      function closeLightbox() {
        lightboxOverlay.style.visibility = 'hidden';
        lightboxOverlay.style.opacity = '0';
      }

      // Initialize lightbox
      updateImage();
      lightboxOverlay.style.visibility = 'visible';
      lightboxOverlay.style.opacity = '1';
    }
  }
});
