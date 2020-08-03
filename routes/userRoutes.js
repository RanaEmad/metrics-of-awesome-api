const express = require("express");
const router = express.Router();
let UsersController = require("../controllers/UserController");
UsersController = new UsersController();

router.post("/signup", UsersController.signUp);

module.exports = router;
