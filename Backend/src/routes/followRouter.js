const express=require("express");
const {followTheUser,acceptRequest,rejectTheRequest,unFollowUser}=require("../controller/followController");
const identifyUser = require("../middlewares/authMiddlewares");
const router=express.Router();

router.post("/follow/:username",identifyUser,followTheUser)

router.post("/follow/accept/:followerId",identifyUser,acceptRequest)
router.post("/follow/reject/:followerId",identifyUser,rejectTheRequest)


router.delete("/unfollow/:username",identifyUser,unFollowUser)


module.exports=router