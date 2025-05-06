let currentImages = [];
let currentIndex = 0;

// Load albums
fetch('/api/albums')
    .then(res => res.json())
    .then(albums => {
        const container = document.getElementById('albums');
        albums.forEach(album => {
            const btn = document.createElement('button');
            btn.textContent = album;
            btn.onclick = () => loadAlbum(album);
            container.appendChild(btn);
        });
    });

// Load images in selected album
function loadAlbum(albumName) {
    fetch(`/api/album/${albumName}`)
        .then(res => res.json())
        .then(data => {
            currentImages = data.images;
            currentIndex = 0;
            showImage();
        });
}

function showImage() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    if (currentImages.length === 0) {
        gallery.textContent = 'No images found';
        return;
    }

    const img = document.createElement('img');
    img.src = currentImages[currentIndex].url;
    img.alt = currentImages[currentIndex].filename;
    gallery.appendChild(img);

    const controls = document.createElement('div');
    controls.innerHTML = `
        <button onclick="prevImage()">← Prev</button>
        <button onclick="nextImage()">Next →</button>
    `;
    gallery.appendChild(controls);
}

function nextImage() {
    if (!currentImages.length) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImage();
}

function prevImage() {
    if (!currentImages.length) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImage();
}
