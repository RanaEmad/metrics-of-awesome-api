let User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UsersController {
  signUp(req, res) {
    let user = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    };
    User.create(user, (err, user) => {
      if (err) {
        console.error(err);
        res.status(500).json({ auth: false, msg: "An error occured" });
      } else {
        let token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
          expiresIn: 86400,
        });
        res.status(201).json({ auth: true, token });
      }
    });
  }
}
module.exports = UsersController;
