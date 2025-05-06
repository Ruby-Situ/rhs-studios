const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.static("public")); // serve HTML, JS, CSS, images

app.get("/images", (req, res) => {
  const baseDir = path.join(__dirname, "public/assets/images");

  fs.readdir(baseDir, (err, folders) => {
    if (err) return res.status(500).json({ error: "Failed to read folders" });

    const albums = {};

    folders.forEach((folder) => {
      const folderPath = path.join(baseDir, folder);
      const isDir = fs.statSync(folderPath).isDirectory();

      if (isDir) {
        const files = fs.readdirSync(folderPath).filter((file) =>
          /\.(jpe?g|png|gif)$/i.test(file)
        );

        albums[folder] = files.map(
          (file) => `/assets/images/${folder}/${file}`
        );
      }
    });

    res.json(albums);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
