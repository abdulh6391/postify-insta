const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const followRouter = require("./routes/followRouter");

const app = express();
app.use(express.static("./public"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", followRouter);

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

module.exports = app;
