const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve static assets (images, CSS, JS files)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Root route: Serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Albums API endpoint
app.get('/api/albums', (req, res) => {
  const albumsDir = path.join(__dirname, 'assets', 'images', 'albumFolders');
  fs.readdir(albumsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read album folders' });
    }
    const albums = files.filter(file => fs.statSync(path.join(albumsDir, file)).isDirectory());
    res.json(albums);
  });
});

// API endpoint for images in an album
app.get('/api/album/:albumName', (req, res) => {
  const albumName = req.params.albumName;
  const albumDir = path.join(__dirname, 'assets', 'images', 'albumFolders', albumName);

  fs.readdir(albumDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to read album images' });
    }

    const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file)).map(file => {
      return { filename: file, url: `/assets/images/albumFolders/${albumName}/${file}` };
    });

    res.json({ album: albumName, images: images });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
