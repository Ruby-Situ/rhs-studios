const express = require("express");
const path = require("path");
const fs = require("fs").promises;

const app = express();
const PORT = 3000;

// Serve static files (images, CSS, JS) from the "assets" folder
app.use("/assets", express.static(path.join(__dirname, "assets"))); 

// Endpoint to get album data (folders and images)
app.get("/api/albums", async (req, res) => {
  const imagesDir = path.join(__dirname, "assets/images");

  try {
    // Read all the folders in the images directory
    const folders = await fs.readdir(imagesDir);
    const albums = {};

    // Loop through each folder
    for (const folder of folders) {
      const folderPath = path.join(imagesDir, folder);
      const stats = await fs.stat(folderPath);

      // Check if it's a directory
      if (stats.isDirectory()) {
        const files = await fs.readdir(folderPath);

        // Filter only image files (JPEG, PNG, GIF)
        const imageFiles = files.filter(file =>
          /\.(jpe?g|png|gif)$/i.test(file)
        );

        // Create album entry for the folder
        albums[folder] = imageFiles.map(file => `/assets/images/${folder}/${file}`);
      }
    }

    res.json(albums); // Send album data (folders and images) to the client
  } catch (error) {
    res.status(500).json({ error: "Failed to read image folders" });
  }
});

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
