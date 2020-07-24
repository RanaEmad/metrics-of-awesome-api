const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
  console.log(`app up and running on port ${process.env.PORT}`);
});
