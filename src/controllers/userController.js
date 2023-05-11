const User = require("../models/userModel");
const passport = require("passport");

const PostUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const existingUserUsername = await User.findOne({ username });
    const existingUserEmail = await User.findOne({ email });
    if (existingUserUsername || existingUserEmail) {
      return res.status(401).send({ message: "Username already taken" });
    }
    const user = new User({ email, username }); //cria um novo utilizador

    await User.register(user, password); //guarda os dados na BD.
    res.json({ message: "User Authenticated!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const GetUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(401).json(err);
    }
    if (user) {
      const tokenId = user.id;
      return res.status(200).cookie("token", tokenId).json({ message: "Login Successful" });
    } else {
      res.status(401).json(info);
    }
  })(req, res, next);
};

const GetUserById = async (req, res) => {
  let userID = req.cookies.token;
  try {
    const user = await User.findById(userID);
    if (user) {
      return res.status(200).json({ user: user });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const LogoutUser = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: "User Logged Out!" });
    });
  });
};

module.exports = {
  PostUser,
  GetUser,
  GetUserById,
  LogoutUser,
};
