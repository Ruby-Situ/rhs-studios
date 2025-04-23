const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (images, css, js, etc.)
app.use(express.static('public'));

// Function to recursively get all image files in a directory
const getImagesFromDirectory = (dirPath) => {
  let images = [];
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      // If it's a directory, recurse into it
      images = images.concat(getImagesFromDirectory(fullPath));
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
      // If it's an image file, add it to the list
      images.push(fullPath);
    }
  });
  return images;
};

// Route to get images
app.get('/images', (req, res) => {
  const imagesFolderPath = path.join(__dirname, 'public', 'assets', 'images');
  const imagePaths = getImagesFromDirectory(imagesFolderPath);

  // Convert file paths to relative URLs
  const imageUrls = imagePaths.map((filePath) => {
    return filePath.replace(path.join(__dirname, 'public'), '');
  });

  res.json(imageUrls);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
