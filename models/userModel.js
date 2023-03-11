const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please enter an username"],
      unique: [true, "replace this username"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please enter an email"],
      unique: [true, "replace this email"],
      lowercase: true,
      trim: true,
      validate: [isEmail, "please enter valid email"],
    },
    password: {
      type: String,
      required: [true, "please enter an password"],
      minlength: [4, "minimun length 4 "],
    }
  },
  {
    timestamps: true,
  }
);

userSchema.statics.EmailToken = async function (email) {
  const user = await this.findOne({ email });
  return !!user;
};

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};

module.exports = mongoose.model("User", userSchema);
