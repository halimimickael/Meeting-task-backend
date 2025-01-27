const express = require("express");
const { hoursWorkModel, validateHoursWork } = require("../models/hoursWorkModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const hoursWork = await hoursWorkModel.find();
    res.status(200).json(hoursWork);
  } catch (err) {
    res.status(500).json({
      message: "Error retrieving working hours.",
      error: err.message,
    });
  }
});

router.post("/", async (req, res) => {
    const { date, hourStart, hourFinish } = req.body;
  
    const { error } = validateHoursWork(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
  
    const startInMinutes = parseInt(hourStart.replace(":", ""), 10);
    const finishInMinutes = parseInt(hourFinish.replace(":", ""), 10);
    if (startInMinutes >= finishInMinutes) {
      return res.status(400).json({
        message: "Start time must be before end time.",
      });
    }
  
    try {
      const existingRecord = await hoursWorkModel.findOne({ date });
      if (existingRecord) {
        return res.status(400).json({
          message: "A time slot already exists for this date.",
        });
      }
  
      const hoursWork = new hoursWorkModel({
        date,
        hourStart,
        hourFinish,
      });
  
      const newHoursWork = await hoursWork.save();
      res.status(201).json(newHoursWork);
    } catch (err) {
      res.status(500).json({
        message: "Error creating time slot.",
        error: err.message,
      });
    }
  });

router.put("/:id", async (req, res) => {
    const { date, hourStart, hourFinish } = req.body;
  
    const { error } = validateHoursWork(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
  
    const startInMinutes = parseInt(hourStart.replace(":", ""), 10);
    const finishInMinutes = parseInt(hourFinish.replace(":", ""), 10);
    if (startInMinutes >= finishInMinutes) {
      return res.status(400).json({
        message: "Start time must be before end time.",
      });
    }
  
    try {
      const hoursWork = await hoursWorkModel.findById(req.params.id);
      if (!hoursWork) {
        return res.status(404).json({
          message: "Time slot not found.",
        });
      }
  
      hoursWork.date = date;
      hoursWork.hourStart = hourStart;
      hoursWork.hourFinish = hourFinish;
  
      const updatedHoursWork = await hoursWork.save();
      res.status(200).json(updatedHoursWork);
    } catch (err) {
      res.status(500).json({
        message: "Error updating time slot.",
        error: err.message,
      });
    }
  });
  

module.exports = router;
