const express=require("express");

const router=express.Router();

const category=require("../../controller/category/category");
const location=require("../../middleWare/fileHandler");


router.get("/getcategory",category.getcategory);
router.get("/getcategorybyid/:id",category.getcategorybyid);
router.get("/getcategorybyname/:id",category.getcategorybyname);
router.post("/addcategory",location.single("img"),category.addcategory);
router.put("/updatecategory/:id",location.single("img"),category.updatecategory);
router.delete("/deletecategory/:id",category.deletecategory);



module.exports=router;