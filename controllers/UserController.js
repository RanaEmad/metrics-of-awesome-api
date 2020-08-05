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
  dashboard(req, res) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({ success: false, msg: "Missing token" });
    }
    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, msg: err });
      }
      let metrics = {
        breathtaking: 0,
        awesome: 0,
        amazeballs: 0,
        phenomenal: 0,
        mindblowing: 0,
      };
      let min = 10;
      let max = 20;
      let remainder = 90;

      for (const key in metrics) {
        let num = Math.floor(Math.random() * (max - min) + min);
        metrics[key] = num;
        remainder = remainder - num;
        if (remainder <= 0) {
          break;
        }
        max = remainder;
      }
      metrics["mindblowing"] += 10;
      return res.status(200).json({ success: true, metrics });
    });
  }
}
module.exports = UsersController;
