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

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(422).json({ message: "Username or Password Is Incorrect!" });
    }

    jwt.sign(
      { email: user.email, id: user._id },
      "secret",
      {},
      (err, token) => {
        if (err) throw err;
        console.log(token)
        res.cookie('token', token).json(user);
      }
    );
  } catch (err) {
    res.json(err);
  }
};

const PostUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    await UserModel.create({
      username,
      password: hashedPassword,
      email,
    });

    res.json({ message: "User Registered Successfuly!" });
  } catch (error) {
    res.status(422).json(error);
  }
};

const ShowUser = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, "secret", {}, async (err, userData) => {
      if (err) throw err;
      const user = await UserModel.findById(userData.id);
      console.log(user);
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

const LogoutUser = (req,res) => {
  res.cookie('token', '').json(true);
}

module.exports = {
  GetUser,
  PostUser,
  ShowUser,
  LogoutUser
};
