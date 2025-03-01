const express = require("express");

const router = express.Router();

const banner = require("../../controller/banner/banner");
const location = require("../../middleWare/fileHandler");

router.get("/getbanner", banner.getbanner);
router.post("/addbanner", location.single("img"), banner.addbanner);
router.delete("/deletebanner/:id",banner.deletebanner);


module.exports = router;