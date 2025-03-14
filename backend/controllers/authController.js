const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      next(errorHandler(400, "All fields are required"));
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      next(errorHandler(400, "Email already exists"));
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password || email === "" || password === "") {
      next(errorHandler(400, "All fields are required"));
    }

    // check if the user exists
    const validUser = await User.findOne({ email });

    if (!validUser) {
      next(errorHandler(400, "User not found"));
    }

    // check if the password is correct
    const passwordCorrect = await bcrypt.compare(password, validUser.password);

    if (!passwordCorrect) {
      return next(errorHandler(400, "Invalid password"));
    }

    // create and assign a token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { password: pass, ...rest } = validUser._doc;

    // Send token in httpOnly cookie
    res.cookie("access_token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    res.status(201).json({
      success: true,
      data: rest,
      message: "User logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, signin };
