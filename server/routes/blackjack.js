//router
const express = require('express');
const Blackjack = express.Router();
const {initialDeal} = require('./blackjackLogic')

//get request-- for a button to deal.  
//shuffle deck, deal.  return 2 cards to user, 2 cards to dealer

//get request
Blackjack.get('/', async (req, res) => {
  
  try {
    console.log('gettt')
    const start = await initialDeal();
    res.status(201).send(start)
  }
  catch (err) {
    console.log('err', err);
    res.sendStatus(500)
  }
  

})

module.exports = {Blackjack}
