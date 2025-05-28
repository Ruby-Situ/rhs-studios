import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { category, album } = req.query;

  if (!category) {
    res.status(400).json({ error: 'Missing category parameter' });
    return;
  }

  // Base path to albums folder
  const albumsBasePath = path.join(process.cwd(), 'public', 'albums');
  const categoryPath = path.join(albumsBasePath, category);

  if (!fs.existsSync(categoryPath)) {
    res.status(404).json({ error: `Category "${category}" not found` });
    return;
  }

  if (album) {
    // Return list of images inside the album folder
    const albumPath = path.join(categoryPath, album);

    if (!fs.existsSync(albumPath)) {
      res.status(404).json({ error: `Album "${album}" not found in category "${category}"` });
      return;
    }

    // Filter image files
    const images = fs.readdirSync(albumPath).filter(file =>
      /\.(jpe?g|png|gif|webp)$/i.test(file)
    ).map(file => `/albums/${category}/${album}/${file}`);

    res.status(200).json({ images });
  } else {
    // Return list of albums inside the category folder
    const albums = fs.readdirSync(categoryPath).filter(name => {
      return fs.statSync(path.join(categoryPath, name)).isDirectory();
    });

    // For each album, pick the first image as cover
    const albumData = albums.map(albumName => {
      const albumDir = path.join(categoryPath, albumName);
      const images = fs.readdirSync(albumDir).filter(file =>
        /\.(jpe?g|png|gif|webp)$/i.test(file)
      );

      return {
        name: albumName,
        cover: images.length > 0 ? `/albums/${category}/${albumName}/${images[0]}` : null
      };
    });

    res.status(200).json({ albums: albumData });
  }
}
