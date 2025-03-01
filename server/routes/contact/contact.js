const express=require("express");

const router=express.Router();
const contact=require("../../controller/contact/contact");

router.get("/getcontact",contact.getcontact);
router.post("/addcontact",contact.addcontact);
router.delete("/deletecontact/:id",contact.deletecontact);

module.exports=router;