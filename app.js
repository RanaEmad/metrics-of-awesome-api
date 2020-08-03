const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`app up and running on port ${process.env.PORT}`);
});
