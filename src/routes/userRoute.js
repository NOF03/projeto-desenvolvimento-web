let router = require("express").Router();
let userController = require("../controllers/userController.js");

router.get("/profile", userController.ShowUser);

router.post("/register", userController.PostUser);

router.post("/login", userController.GetUser);

router.post("/logout", userController.LogoutUser);

module.exports = router;
