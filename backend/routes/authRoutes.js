const router = require("express").Router();
const { signup } = require("../controllers/authController.js");

router.post("/signup", signup);

module.exports = router;
