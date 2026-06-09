const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username is required unique"],
    required: [true, "Username is required "],
  },
  email: {
    type: String,
    unique: [true, "Email already Exists"],
    required: [true, "Email is required "],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },
  bio: String,
  profileImage: {
    type: String,
    default:
      "https://plus.unsplash.com/premium_photo-1773833960283-241a4bf303c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
