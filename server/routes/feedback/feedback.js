const express=require("express");

const router=express.Router();
const feedback=require("../../controller/feedback/feedback");

router.get("/getfeedback",feedback.getfeedback);
router.post("/addfeedback",feedback.addfeedback);
router.delete("/deletefeedback/:id",feedback.deletefeedback);

module.exports=router;