//router
const express = require('express');
const passport = require('passport');
const { User } = require('../../db');
const Blackjack = express.Router();
const {initialDeal, hit} = require('./blackjackLogic');

//get request-- for a button to deal.  
//shuffle deck, deal.  return 2 cards to user, 2 cards to dealer

//get request
/**
 * this is for the initial deal.   calls the initialDeal function in blackjack logic, sends those cards back to the front end
 */
Blackjack.get('/', async (req, res) => {
  console.log('req.user', req.user);

  try {
    const start = await initialDeal();
    res.status(201).send(start);
  } catch (err) {
    console.log('err', err);
    res.sendStatus(500);
  }
  

});

/**
 * this is when the dealer or user 'hits', i.e. draws another card.  It calls the hit function in blackjack logic.  sends the updated hand along with updated totals back to the front end
 * params: deckId and player.  deckId is waht is needed to call the api.  player is user or dealer. 
 */
Blackjack.get('/hit/:deckId&:player', async(req, res) => {
  try {
    //get deckId and what player from the req.params
    
    const {deckId, player} = req.params;
    const hand = await hit(deckId, player);
    res.status(201).send(hand);
  } catch (err) {
    console.log('hit err', err);
    res.sendStatus(500);
  }
});

/**
 * needa function here for when a bet is won/lost, to update the DB with the new bank
 * 
 */
Blackjack.put('/bet/:amount/', async(req, res) => {
  try {
    //console.log('put request, req.user');
    const {amount} = req.params;

    // console.log('amount', amount);
    // console.log(req.session);
    const {passport} = req.session;
    // console.log('passport', passport)
    //find by user Id
    //const {session} = req  //get the session, userId from the session?

    const id = '1'; //get this from session.  hardcoded for now

    const x = await User.findOne({where: {id: id }});
    //console.log(typeof x.money, typeof amount);
    const newMoney = x.money + parseInt(amount);
    //console.log(newMoney)
    await User.update({money: newMoney}, { //add or subtract, just testing
      //
      where: {id: passport.user}
    });

    res.sendStatus(200);

    

    //update with the amount 


  } catch (err) {
    console.log('blackjack betting put err', err);
    res.sendStatus(404);
  }
});

module.exports = {Blackjack};
