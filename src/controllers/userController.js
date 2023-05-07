const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserModel = require("../models/userModel");

const GetUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    
    if (!user) {
      return res.json({ message: "User Doesn't Exist!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ message: "Username or Password Is Incorrect!" });
    }

    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
  } catch (err) {
    res.json(err);
  }
};

const GetUserByID = async (req, res) => {
  const id = window.localStorage.getItem("userID");
  try {
    const user = await UserModel.findById(id).exec();
    if (user) {
      console.log("User Found!");
      return res.json({ user: user });
    }

  } catch (err) {
    console.error(err);
  }
};

const PostUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const userEmail = await UserModel.findOne({ email });
    const userName = await UserModel.findOne({ username });
    if (userEmail || userName) {
      return res.json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
      email,
    });
    await newUser.save();

    res.json({ message: "User Registered Successfuly!" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  GetUser,
  PostUser,
  GetUserByID,
};
