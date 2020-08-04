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
        return res.status(500).json({ auth: false, msg: "An error occured" });
      } else {
        let token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, {
          expiresIn: 86400,
        });
        return res.status(201).json({ auth: true, token });
      }
    });
  }

  signIn(req, res) {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ auth: false, msg: "An error occured" });
      } else {
        if (user) {
          const valid = bcrypt.compareSync(req.body.password, user.password);
          if (valid) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN, {
              expiresIn: 86400,
            });
            return res.status(200).json({ auth: true, token: token });
          } else {
            return res.status(401).json({ msg: "invalid credentials" });
          }
        } else {
          return res.status(401).json({ msg: "invalid credentials" });
        }
      }
    });
  }
}
module.exports = UsersController;
