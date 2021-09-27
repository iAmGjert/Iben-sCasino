//router
const express = require('express');
const Blackjack = express.Router();
const {initialDeal, hit} = require('./blackjackLogic');

//get request-- for a button to deal.  
//shuffle deck, deal.  return 2 cards to user, 2 cards to dealer

//get request
Blackjack.get('/', async (req, res) => {
  
  try {
    const start = await initialDeal();
    res.status(201).send(start);
  } catch (err) {
    console.log('err', err);
    res.sendStatus(500);
  }
  

});

Blackjack.get('/hit/:deckId&:player', async(req, res) => {
  try {
    //get deckId and what player from the req.params
    console.log('hit');
    const {deckId, player} = req.params;
    console.log('parmaams', req.params, 'deckId', deckId, 'player', player, );
    const hand = await hit(deckId, player);
    console.log('hand', hand);
    res.status(201).send(hand);
  } catch (err) {
    console.log('hit err', err);
    res.sendStatus(500);
  }
});

module.exports = {Blackjack};
