const Image = require('../models/Image');
const fs = require('fs');
const path = require('path');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const image = new Image({
      filename: req.file.filename,
      path: req.file.path
    });

    await image.save();

    res.json({ message: 'Image uploaded successfully', filename: req.file.filename });
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({ message: 'Failed to upload image' });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    console.error('Error retrieving images:', err);
    res.status(500).json({ message: 'Failed to retrieve images' });
  }
};

exports.getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const imagePath = path.join(__dirname, '..', image.path);
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error('Error reading image file:', err);
        return res.status(500).json({ message: 'Failed to read image file' });
      }
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(data);
    });
  } catch (err) {
    console.error('Error retrieving image:', err);
    res.status(500).json({ message: 'Failed to retrieve image' });
  }
};
