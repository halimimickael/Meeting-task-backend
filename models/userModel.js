const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  admin: { type: Boolean, default: false },  
});

const UserModel = mongoose.model("users", userSchema);

// Validation schema for user registration
function userValid(body) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(100).required(),
    admin: Joi.boolean(), // No default here, since it's handled by the database
  });
  return schema.validate(body);
}

// Validation schema for login
function loginValid(body) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(body);
}

// Create a JWT token
function createToken(userId) {
  const jwt = require("jsonwebtoken");
  const secretKey = process.env.JWT_SECRET || "defaultSecretKey"; // Use environment variable for better security
  return jwt.sign({ _id: userId }, secretKey, { expiresIn: "60m" });
}

module.exports = {
  UserModel,
  userValid,
  loginValid,
  createToken,
};
