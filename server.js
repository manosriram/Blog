const express = require("express");
const app = express();
const bp = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const db = require("./DBase/url").url;
require("dotenv").config();

mongoose.set("useFindAndModify", false);
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("MongoDB Connected !"))
  .catch(err => console.log(err));

app.use(bp.json());
app.use("/auth", require("./Controllers/Auth"));

app.listen(PORT, () => console.log(`Server at ${PORT}`));
module.exports = app;
