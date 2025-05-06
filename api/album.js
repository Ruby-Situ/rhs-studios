// api/albums.js
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const albumsDir = path.join(process.cwd(), 'assets', 'images');
  const albums = [];

  // Read all folders (albums)
  fs.readdirSync(albumsDir).forEach(albumFolder => {
    const albumPath = path.join(albumsDir, albumFolder);
    if (fs.statSync(albumPath).isDirectory()) {
      const images = fs.readdirSync(albumPath).filter(file => file.endsWith('.jpg'));
      albums.push({
        albumName: albumFolder,
        images: images.map(image => `/assets/images/${albumFolder}/${image}`)
      });
    }
  });

  res.status(200).json(albums);
};
