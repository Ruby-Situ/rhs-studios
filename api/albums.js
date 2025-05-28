import fs from 'fs';
import path from 'path';

const albumsDir = path.join(process.cwd(), 'public/albums');

export default function handler(req, res) {
  const { album } = req.query;

  if (album) {
    // Return all images inside a single album
    const albumPath = path.join(albumsDir, album);
    if (!fs.existsSync(albumPath)) {
      return res.status(404).json({ error: 'Album not found' });
    }
    const images = fs.readdirSync(albumPath).filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));
    const imagePaths = images.map(img => `/albums/${album}/${img}`);
    return res.status(200).json({ images: imagePaths });
  } else {
    // Return list of albums with first image as cover
    const albums = fs.readdirSync(albumsDir).filter(folder =>
      fs.statSync(path.join(albumsDir, folder)).isDirectory()
    );

    const data = albums.map(album => {
      const images = fs.readdirSync(path.join(albumsDir, album)).filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));
      return {
        name: album,
        cover: images.length > 0 ? `/albums/${album}/${images[0]}` : null,
      };
    });

    return res.status(200).json({ albums: data });
  }
}
