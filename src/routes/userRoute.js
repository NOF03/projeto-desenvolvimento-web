let router = require("express").Router();
let userController = require("../controllers/userController.js");

router.get("/getuser", userController.GetUserByID)

router.post("/register", userController.PostUser);

router.post("/login", userController.GetUser);

module.exports = router;
