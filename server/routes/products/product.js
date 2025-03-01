const express=require("express");

const router=express.Router();


const product=require("../../controller/products/product");
const location=require("../../middleWare/fileHandler");


router.get("/getproducts",product.getproduct);
router.get("/getproductsbycategory/:id",product.getproductsbycategory);
router.get("/getproductbyid/:id",product.getproductsbyid);
router.get("/getproductsbycategoryid/:id",product.getproductsbycategoryid);
router.put("/updateproductstatus/:id",product.productstatus);
router.post("/addproducts",location.array("img",10),product.addproduct);
router.patch("/updateproduct/:id",location.array("img",10),product.updateproducts);
router.delete("/deleteproducts/:id",product.deleteproducts);

module.exports=router;