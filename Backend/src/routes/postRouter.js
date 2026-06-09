const express = require("express");
const {
  creatingPost,
  getPost,
  getPostDetailtById,
  likeThePost,
  unLikeThePost,
  getFeed,
} = require("../controller/postController");
const multer = require("multer");
const identifyUser = require("../middlewares/authMiddlewares");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/post", identifyUser, upload.single("imgUrl"), creatingPost);

router.get("/post", identifyUser, getPost);
router.get("/details/:postId", identifyUser, getPostDetailtById);

router.post("/like/:postId", identifyUser, likeThePost);
router.post("/unLike/:postId",identifyUser,unLikeThePost)

router.get("/feed",identifyUser,getFeed)

module.exports = router;
