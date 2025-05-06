const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve public (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Serve static images from assets
app.use('/assets/images', express.static(path.join(__dirname, 'assets/images')));

// Path to image albums
const IMAGES_PATH = path.join(__dirname, 'assets/images');

// API: List albums
app.get('/api/albums', (req, res) => {
    fs.readdir(IMAGES_PATH, { withFileTypes: true }, (err, files) => {
        if (err) return res.status(500).json({ error: 'Unable to read albums' });

        const albums = files
            .filter(f => f.isDirectory())
            .map(dir => dir.name);

        res.json(albums);
    });
});

// API: List images in a given album
app.get('/api/album/:albumName', (req, res) => {
    const album = req.params.albumName;
    const albumPath = path.join(IMAGES_PATH, album);

    fs.readdir(albumPath, (err, files) => {
        if (err) return res.status(404).json({ error: 'Album not found' });

        const images = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => ({
                filename: file,
                url: `/assets/images/${album}/${file}`
            }));

        res.json({
            album: album,
            images: images
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
