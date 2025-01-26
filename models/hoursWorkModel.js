const mongoose = require("mongoose");
const Joi = require("joi");

const hoursWorkSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  hourStart: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^\d{2}:\d{2}$/.test(v),
      message: "The start time format must be HH:mm.",
    },
  },
  hourFinish: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^\d{2}:\d{2}$/.test(v),
      message: "The end time format must be HH:mm.",
    },
  },
});

const hoursWorkModel = mongoose.model("HoursWork", hoursWorkSchema);

const validateHoursWork = (bodyData) => {
  const joiSchema = Joi.object({
    date: Joi.string().min(2).max(500).required(),
    hourStart: Joi.string()
      .pattern(/^\d{2}:\d{2}$/)
      .required()
      .messages({
        "string.pattern.base": "The start time format must be HH:mm.",
      }),
    hourFinish: Joi.string()
      .pattern(/^\d{2}:\d{2}$/)
      .required()
      .messages({
        "string.pattern.base": "The end time format must be HH:mm.",
      }),
  });

  return joiSchema.validate(bodyData);
};

module.exports = {
  hoursWorkModel,
  validateHoursWork,
};
