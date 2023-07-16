const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller.js");


router.get("/", homeController.home);
router.use("/files", require("./files.js"));


module.exports = router;