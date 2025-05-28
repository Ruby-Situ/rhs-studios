// api/albums.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const albumsDir = path.join(process.cwd(), 'public/albums');
  const albumFolders = fs.readdirSync(albumsDir);

  const albums = {};

  albumFolders.forEach(album => {
    const albumPath = path.join(albumsDir, album);
    if (fs.lstatSync(albumPath).isDirectory()) {
      const images = fs.readdirSync(albumPath).filter(file =>
        /\.(jpe?g|png|gif|webp)$/i.test(file)
      );
      albums[album] = images;
    }
  });

  res.status(200).json(albums);
}
