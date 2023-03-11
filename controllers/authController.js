const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");

const maxAge = 10 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "secret", { expiresIn: maxAge });
};

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      msg: errors,
    });
  }
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.status(201).json({
      user,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      msg: errors,
    });
  }
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

exports.logout = async (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.json({
    msg: "Logged out",
  });
};
