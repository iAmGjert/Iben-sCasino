const express = require('express');
const Poker = express.Router();
const {initialDeal, putBet, bestHand, addToFlop} = require('./pokerlogic');
const {PokerGames} = require('../../../db');
const { dealerBet, dealerBlind } = require('./dealerLogic');

Poker.get('/init/:buyIn/:bigBlind', async (req, res) => {
  try {
    console.log('init');
    const {buyIn, bigBlind} = req.params;

    console.log('init');
    const logic = await initialDeal(1, buyIn, bigBlind); //this userId is hardcoded...grab it from req.user
    //  console.log('logic', logic);
    res.status(201).send(logic);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);

  }
});

//update this enpt to include parameters for bet amount and also gameId
//put request for betting.  auto deal accepts 0 for false and 1 for true
Poker.put('/bet/:gameId/:bet/:autoDeal', async (req, res) => {
  const {gameId, bet, autoDeal} = req.params;
  console.log('put request, gameId and bet: ', gameId, bet);
  try {
    console.log('put bet');
    //testing hardcoded
    
    await putBet(gameId, bet);

    if (parseInt(autoDeal)) { //automatically dealer bet if the paramter indicates should
      const dBet = await dealerBet(gameId, bet);
      res.status(200).json(dBet);
      return;
    }
    
    res.sendStatus(200);
    
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//this one for the blinds
Poker.put('/blinds/:gameId/:bet', async (req, res) => {
  const {gameId} = req.params;
  const bet = parseInt(req.params.bet);
  console.log('blindbet');
  console.log('put request, gameId and bet: ', gameId, bet);
  try {
    console.log('put bet');
    //testing hardcoded
    //const gameId = 1;
    //const bet = 5;
    await putBet(gameId, bet);

    const moneyOnTable = await dealerBlind(gameId, bet / 2);



    res.status(200).json(moneyOnTable);
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

Poker.get('/dealerBet/:gameId/:call', async( req, res) => {
  try {
    const {gameId, call} = req.params;
    console.log('get dealerBet', gameId, call);
    
    const dB = await dealerBet(gameId, parseInt(call));
    //db is an object with {move: string, bet: number}
    
    res.status(201).send(dB);


  } catch (err) {
    console.log(err);
  }
});

Poker.get('/addToFlop/:gameId', async (req, res) => {
  const {gameId} = req.params;
  console.log('get addToFlop');
  try {
    const newCard = await addToFlop(gameId); //newCard will be an obj with code and image properties
    res.status(201).send(newCard);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = {Poker};