document.addEventListener('DOMContentLoaded', () => {
  const galleryContainer = document.getElementById('gallery');
  const lightbox = createLightbox();

  // Fetch and show albums on load
  fetch('/api/albums')
    .then(res => res.json())
    .then(data => {
      renderAlbums(data.albums);
    })
    .catch(console.error);

  // Render albums list with covers
  function renderAlbums(albums) {
    galleryContainer.innerHTML = '';
    albums.forEach(album => {
      const albumDiv = document.createElement('div');
      albumDiv.className = 'album';

      const img = document.createElement('img');
      img.src = album.cover || '';
      img.alt = album.name;
      img.loading = 'lazy';

      const title = document.createElement('div');
      title.className = 'album-title';
      title.textContent = album.name;

      albumDiv.appendChild(img);
      albumDiv.appendChild(title);
      galleryContainer.appendChild(albumDiv);

      albumDiv.addEventListener('click', () => {
        openAlbum(album.name);
      });
    });
  }

  // Fetch images inside an album and open lightbox
  function openAlbum(albumName) {
    fetch(`/api/albums?album=${encodeURIComponent(albumName)}`)
      .then(res => res.json())
      .then(data => {
        if (!data.images || data.images.length === 0) {
          alert('No images in this album.');
          return;
        }
        lightbox.open(data.images);
      })
      .catch(err => {
        console.error(err);
        alert('Failed to load album images.');
      });
  }

  // Simple lightbox gallery with next/prev
  function createLightbox() {
    let images = [];
    let currentIndex = 0;

    // Create overlay elements
    const overlay = document.createElement('div');
    overlay.id = 'lightbox-overlay';
    overlay.style.cssText = `
      position: fixed; top:0; left:0; width:100vw; height:100vh;
      background: rgba(0,0,0,0.9);
      display: flex; align-items: center; justify-content: center;
      visibility: hidden; opacity: 0; transition: opacity 0.3s;
      z-index: 9999;
    `;

    const img = document.createElement('img');
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.alt = 'Gallery Image';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '<';
    prevBtn.style.cssText = buttonStyle() + 'left: 20px;';

    const nextBtn = document.createElement('button');
    nextBtn.textContent = '>';
    nextBtn.style.cssText = buttonStyle() + 'right: 20px;';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = buttonStyle() + 'top: 20px; right: 20px; font-size: 30px;';

    overlay.appendChild(img);
    overlay.appendChild(prevBtn);
    overlay.appendChild(nextBtn);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    // Helpers
    function buttonStyle() {
      return `
        position: absolute;
        background: rgba(255,255,255,0.3);
        border: none;
        color: white;
        font-size: 40px;
        padding: 10px 15px;
        cursor: pointer;
        user-select: none;
        border-radius: 5px;
        transition: background 0.3s;
      `;
    }

    // Show image at currentIndex
    function showImage() {
      img.src = images[currentIndex];
    }

    function open(imgs) {
      images = imgs;
      currentIndex = 0;
      showImage();
      overlay.style.visibility = 'visible';
      overlay.style.opacity = '1';
    }

    function close() {
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.visibility = 'hidden';
        images = [];
      }, 300);
    }

    function prev() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage();
    }

    function next() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage();
    }

    // Events
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    closeBtn.addEventListener('click', close);

    // Close lightbox on overlay click (except when clicking buttons or image)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (overlay.style.visibility === 'visible') {
        if (e.key === 'ArrowLeft') prev();
        else if (e.key === 'ArrowRight') next();
        else if (e.key === 'Escape') close();
      }
    });

    return { open, close };
  }
});
