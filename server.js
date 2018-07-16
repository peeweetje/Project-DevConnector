const express = require("express");
const mongoose = require("mongoose");

const app = express();

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to mogoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB is connnected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello!"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
