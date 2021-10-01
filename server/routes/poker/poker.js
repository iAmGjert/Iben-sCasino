const express = require('express');
const Poker = express.Router();
const {initialDeal, putBet, bestHand} = require('./pokerlogic');
const {PokerGames} = require('../../../db');

Poker.get('/init', async (req, res) => {
  try {

    console.log('init');
    const logic = await initialDeal(1, 50); //this userId is hardcoded...grab it from req.user
    //console.log('logic', logic);
    res.status(201).send(logic);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);

  }
});

//update this enpt to include parameters for bet amount and also gameId
//put request for betting
Poker.put('/bet', async (req, res) => {
  try {
    console.log('put bet');
    await putBet(1, 5);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//id in parameters
Poker.put('/bestHand', async (req, res) => {
  try {
    const gameId = 1;
    console.log('besthand');
    const test = ['AS', '9S', '8S', '0S', '7D', '6H', '4D'];
    const best = bestHand(test);
    console.log('best', best);
    //set the best hand in the db
    await PokerGames.update({bestHand: best.bestHand, handRank: best.rank}, {where: {id: gameId}});



    res.sendStatus(201);

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = {Poker};