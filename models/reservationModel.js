const mongoose = require("mongoose");
const Joi = require("joi");

const reservationSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true }, 
  email: { type: String, required: true }, 
});

const reservationModel = mongoose.model("reservations", reservationSchema);
exports.reservationModel = reservationModel;

exports.validreservations = (bodyData) => {
  const joiSchema = Joi.object({
    date: Joi.string().min(2).max(500).required(),
    time: Joi.string().min(2).max(500).required(),
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    phone: Joi.string().min(10).max(15).required(),  
    email: Joi.string().email().required(), 
  });

  return joiSchema.validate(bodyData);
};
