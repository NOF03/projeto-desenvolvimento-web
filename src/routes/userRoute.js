const router = require("express").Router();

let {
  PostUser,
  GetUser,
  GetUserById,
  LogoutUser,
} = require("../controllers/userController.js");

router.post("/profile", GetUserById);

router.post("/register", PostUser);

router.post("/login", GetUser);

router.post("/logout", LogoutUser);

module.exports = router;
