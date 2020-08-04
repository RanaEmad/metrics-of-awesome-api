const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`app up and running on port ${process.env.PORT}`);
});
