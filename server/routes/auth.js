const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { UserModel } = require("../models/user.model");

// File storage with multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

// User Registration Route

authRouter.post(
  "/register",
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const profileImage = req.file;
      if (!profileImage) {
        res.status(400).send("No file Uploaded");
      }

      const profileImagePath = profileImage.path;

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists!" });
      }

      /* Hashing the password */
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new UserModel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profileImagePath,
      });

      await newUser.save();

      res.status(200).send({ msg: "Registration Successful", user: newUser });
    } catch (error) {
      res
        .status(400)
        .send({ msg: "Registration Failed!", error: error.message });
    }
  }
);

// User Login route
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: "User doesn't exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    //  Generating User Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(user);
    delete user.password;
    console.log(user);
    res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = {
  authRouter,
};
