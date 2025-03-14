const User = require("../models/userModel");

const test = async (req, res) => {
  res.json({ message: "API is working" });
};

module.exports = { test };
