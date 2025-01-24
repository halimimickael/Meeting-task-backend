const express = require("express");
const { reservationModel, validreservations } = require("../models/reservationModel"); 
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const reservations = await reservationModel.find(); 
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  // Validation de la demande avec Joi
  const { error } = validreservations(req.body);  // Valider avec Joi
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { date, time, firstName, lastName, phone, email } = req.body;  // Assurez-vous d'extraire tous les champs

  const existingReservation = await reservationModel.findOne({ date, time }); 
  if (existingReservation) {
    return res.status(400).json({ message: 'Ce créneau est déjà réservé' });
  }

  const reservation = new reservationModel({
    date,
    time,
    firstName,
    lastName,
    phone,
    email
  });

  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:idDel', async (req, res) => {
  try {
    const data = await reservationModel.deleteOne({ _id: req.params.idDel });
    res.json(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put('/:idEdit', async (req, res) => {
  try {
    const data = await reservationModel.updateOne({ _id: req.params.idEdit }, req.body);
    res.json(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
