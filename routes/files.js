const express = require("express");
const multer = require("multer");
const router = express.Router();
const fileController = require("../controllers/file_controller");

//  the storage destination for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/files"); //  the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// CSV file type filter function
const csvFileFilter = function (req, file, cb) {
  // Check if the file is a CSV file
  if (
    file.mimetype === "text/csv" ||
    file.mimetype === "application/vnd.ms-excel"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV files are allowed!"), false);
  }
};

// Initializing the Multer middleware with the file type filter
const upload = multer({ storage: storage, fileFilter: csvFileFilter });

router.post("/upload", upload.single("csv-file"), function (req, res) {
  res.redirect("/");
});

router.get("/getdata/:filename", fileController.getData); // to open a file
router.get("/delete/:filename", fileController.deleteFile); // to delete a file

module.exports = router;
