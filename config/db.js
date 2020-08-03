const mongoose = require("mongoose");

mongoose.connect(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connection to db successful!");
});

module.exports = db;
