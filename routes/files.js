const express = require("express");
const multer = require('multer');
const router = express.Router();
const fileController = require('../controllers/file_controller');


//  the storage destination for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/files'); //  the destination folder 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Initialize the Multer middleware
const upload = multer({ storage: storage });

router.post('/upload', upload.single('csv-file'), function (req, res) {
  res.send('File uploaded successfully!');
});


router.get('/getdata/:filename',fileController.getData);


module.exports = router;
