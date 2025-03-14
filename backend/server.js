require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} and DB connected`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
