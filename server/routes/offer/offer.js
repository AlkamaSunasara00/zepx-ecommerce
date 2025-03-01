const express = require("express");
const router = express.Router();

const offer = require("../../controller/offer/offer");
const location = require("../../middleWare/fileHandler");

router.get("/getoffer", offer.getoffer);
router.post("/addoffer", location.single("img"), offer.addoffer);
router.put("/updateoffer" ,offer.updateoffer);
router.delete("/deleteoffer/:id", offer.deleteoffer);

module.exports = router;
