const express = require("express");
const router = express.Router();
let UsersController = require("../controllers/UserController");
UsersController = new UsersController();

router.post("/signup", UsersController.signUp);
router.post("/signin", UsersController.signIn);
router.get("/dashboard", UsersController.dashboard);

module.exports = router;
