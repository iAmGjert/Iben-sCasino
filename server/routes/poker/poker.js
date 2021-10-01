const express = require('express');
const Poker = express.Router();
const {initialDeal} = require('./pokerlogic');

Poker.get('/init', async (req, res) => {
  try {

    console.log('init');
    const logic = await initialDeal(1, 50); //this userId is hardcoded...grab it from req.user
    console.log('logic', logic);
    res.status(201).send(logic);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);

  }
});

module.exports = {Poker};