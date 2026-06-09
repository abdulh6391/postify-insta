const express=require("express");
const {registerUser,loginUser,getMe}=require("../controller/userController");
const identifyUser = require("../middlewares/authMiddlewares");
const router=express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)

router.get("/get-me",identifyUser,getMe)
module.exports=router;