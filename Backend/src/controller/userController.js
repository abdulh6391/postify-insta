const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, email, password, bio, profileImage } = req.body;
  const isUserAlreadyExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      msg:
        "User Already Exists" +
        (isUserAlreadyExists.email == email
          ? "Email Already Exists"
          : "Username Already Exists"),
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    msg: "User Created SuccessFully",
    user: {
      userId: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      password: user.password,
      profileImage: user.profileImage,
      token: token,
    },
  });
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const user = await User.findOne({
    $or: [{ username: username }, { email: email }],
  }).select("+password");
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Password invalid",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  res.status(200).json({
    msg: "User LoggedIn SuccessFully",
    user: {
      userId: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      token: token,
    },
  });
}

async function getMe(req, res) {
  const userId = req.user.id;

  const user = await User.findById(userId);

  res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

module.exports = { registerUser, loginUser, getMe };
