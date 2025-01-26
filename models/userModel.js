const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  admin: { type: Boolean, default: false },  
});

const UserModel = mongoose.model("users", userSchema);

function userValid(body) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(100).required(),
    admin: Joi.boolean(), 
  });
  return schema.validate(body);
}

function loginValid(body) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(body);
}

function createToken(userId) {
  const jwt = require("jsonwebtoken");
  const secretKey = process.env.JWT_SECRET || "defaultSecretKey";
  return jwt.sign({ _id: userId }, secretKey, { expiresIn: "60m" });
}

module.exports = {
  UserModel,
  userValid,
  loginValid,
  createToken,
};
