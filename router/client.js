const express = require("express");
const clientController = require("../controllers/client/clientController");
const router = express.Router();

router.get("/", clientController.getHome);
router.get("/home", clientController.getHome);
module.exports = router;
