// const express = require("express");
// const router = express.Router();
// const login = require("../../../controller/Admin/login/login");

// // Define routes
// router.post("/login", login.login);
// router.get("/admin", login.getAdmin);

// module.exports = router;




const express=require("express");

const router=express.Router();
const admin = require("../../../controller/Admin/login/login");
const location=require("../../../middleWare/fileHandler");





router.get("/admins",admin.getAdmin);
router.post("/checkadmins",admin.loginAdmin);
router.post("/addadmins",location.single("img"),admin.addadmin);
router.put("/updateadmin/:id",location.single("img"),admin.updateadmin);
router.put("/updateadminstatus/:id",admin.adminstatus);
router.get("/getadminbyid/:id",admin.getadminbyid);
router.delete("/deleteadmin/:id",admin.deleteadmin);


module.exports=router;