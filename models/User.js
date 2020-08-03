const mongoose = require("mongoose");
const db = require("../config/db");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  })
);

module.exports = User;
