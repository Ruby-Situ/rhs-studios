import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const baseDir = path.join(process.cwd(), "public/assets/images");

  fs.readdir(baseDir, (err, folders) => {
    if (err) return res.status(500).json({ error: "Failed to read folders" });

    const albums = {};

    folders.forEach((folder) => {
      const folderPath = path.join(baseDir, folder);
      if (fs.statSync(folderPath).isDirectory()) {
        const files = fs
          .readdirSync(folderPath)
          .filter((file) => /\.(jpe?g|png|gif)$/i.test(file));
        albums[folder] = files.map(
          (file) => `/assets/images/${folder}/${file}`
        );
      }
    });

    res.status(200).json(albums);
  });
}
