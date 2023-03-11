const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");
const User = require("../models/userModel");

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("please enter valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value })
          .then((user) => {
            if (user) {
              return Promise.reject("this Email is exits");
            }
          })
          .catch((err) => console.log(err));
      }),
    body("password").trim(),
  ],
  authController.signup
);

router.post(
  "/login",
  [
    body("password").trim(),
  ],
  authController.login
);

router.get("/logout", authController.logout);

module.exports = router;
