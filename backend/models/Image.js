const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: String,
  path: String // Store the path of the image file in the server filesystem
});

module.exports = mongoose.model('Image', imageSchema);
