const { Schema, model } = require("mongoose");
const joi = require("joi");
const { handleMongooseError } = require("../middlewares");

const emailRegexp =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

const registerSchemaJoi = joi.object({
  password: joi.string().min(6).required(),
  email: joi.string().pattern(emailRegexp).required(),
  subscription: joi.string().valid("starter", "pro", "business"),
});

const loginSchemaJoi = joi.object({
  password: joi.string().min(6).required(),
  email: joi.string().pattern(emailRegexp).required(),
});

module.exports = {
  User,
  registerSchemaJoi,
  loginSchemaJoi,
};