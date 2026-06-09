const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const Like = require("../models/LikeModel");

const imagekit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function creatingPost(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "Cohort-2-insta-clone-posts",
  });

  const post = await Post.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });
  res.status(201).json({
    msg: "Post Created SuccessFully",
    post: {
      postId: post._id,
      caption: post.caption,
      userId: post.user,
    },
  });
}

async function getPost(req, res) {
  const userId = req.user.id;

  const posts = await Post.find({
    user: userId,
  });

  return res.status(200).json({
    message: "Post Fetched SuccessFully",
    posts,
  });
}

async function getPostDetailtById(req, res) {
  const userId = req.user.id;

  const postId = req.params.postId;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({
      msg: "Post not Found.",
    });
  }

  if (!post.user.equals(userId)) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }

  return res.status(200).json({
    msg: "Post Found SuccessFully",
    post,
  });
}

async function likeThePost(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not Found",
    });
  }

  const like = await Like.create({
    post: postId,
    user: username,
  });

  return res.status(200).json({
    msg: `Post Liked SuccessFully by the user ${username} and post Id is ${postId}`,
    like,
  });
}

async function unLikeThePost(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const isPostExists = await Post.findById(postId);

  if (!isPostExists) {
    return res.status(403).json({
      msg: "Post does not Exist",
    });
  }

  const isAlreadyLikeOrUnlike = await Like.findOne({
    post: postId,
    user: username,
  });

  if (!isAlreadyLikeOrUnlike) {
    return res.status(400).json({
      msg: "You cannot unlike this post again",
    });
  }

  const post = await Like.findOneAndDelete({
    user: username,
    post: postId,
  });

  return res.status(200).json({
    msg: "You unlike this post",
    post,
  });
}

async function getFeed(req, res) {
  const user = req.user;
  const posts = await Post.find().sort({_id:-1}).populate("user").lean();

  for (let post of posts) {
    const isLiked = await Like.findOne({
      user: user.username,
      post: post._id,
    });
    post.isLiked = Boolean(isLiked);
  }
  return res.status(200).json({
    msg: "All Posts Fetched SuccessFully",
    posts,
  });
}

module.exports = {
  creatingPost,
  getPost,
  getPostDetailtById,
  likeThePost,
  unLikeThePost,
  getFeed,
};
