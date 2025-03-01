const express=require("express");

const router=express.Router();
const signup=require("../../controller/signup/signup");
const location=require("../../middleWare/fileHandler");



router.get("/users",signup.getUser);
router.post("/addusers",signup.addUser);
router.post("/checkusers",signup.login);
router.get("/getuserbyid/:id",signup.getuserbyid);
router.put("/userstatus/:id",signup.userstatus);
router.put("/updatedata/:id",location.single("img"),signup.updatedata);
router.delete("/deleteuser/:id",signup.deleteuser);





module.exports=router;



