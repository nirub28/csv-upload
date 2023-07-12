const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller.js");


router.get("/", homeController.home);
// router.use("/users", require("./users"));
// router.use("/student", require("./student"));
// router.use("/interviews", require("./interview"));

module.exports = router;