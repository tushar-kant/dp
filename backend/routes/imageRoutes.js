const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageController = require('../controllers/imageController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, Date.now() + '.' + ext);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), imageController.uploadImage);
router.get('/all', imageController.getAllImages);
router.get('/:id', imageController.getImage);

module.exports = router;
