const express = require('express');
const Poker = express.Router();
const {initialDeal, putBet, bestHand, addToFlop} = require('./pokerlogic');
const {PokerGames, User} = require('../../../db');
const { dealerBet, dealerBlind } = require('./dealerLogic');
const {Hand} = require('pokersolver');

/**
 * Tthe first function to get hte indital deal
 */
Poker.get('/init/:buyIn/:bigBlind', async (req, res) => {
  try {
    const {buyIn, bigBlind} = req.params;
    //**need to not hardcode hte userId */.  get it from req.user.id
    // console.log('REQ USER', req.user)
    const {id} = req.user;
 
    const logic = await initialDeal(id, buyIn, bigBlind); //this userId is hardcoded...grab it from req.user

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
  try {
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
  try {
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
Poker.put('/bestHand/', async (req, res) => {
  try {
    const {gameId} = 1;
    //whoops this is hardcoded for testing fix this
    const test = ['AS', '9S', '8S', '0S', '7D', '6H', '4D'];
    const best = bestHand(test);
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
    const dB = await dealerBet(gameId, parseInt(call));
    //db is an object with {move: string, bet: number}   
    res.status(201).send(dB);

  } catch (err) {
    console.log(err);
  }
});

Poker.get('/addToFlop/:gameId', async (req, res) => {
  const {gameId} = req.params;
  try {
    const newCard = await addToFlop(gameId); //newCard will be an obj with code and image properties
    //ALSO NEED TO ADD THIS NEW CARD TO THE DB FLOP
    res.status(201).send(newCard);
  } catch (err) {
    console.log('ERR');
    res.sendStatus(500);
  }
});


Poker.get('/winner/:gameId', async(req, res) => {
  try {
    const {gameId} = req.params;
    //retrieve both hands
    const {flop, hand, dealerHand} = await PokerGames.findByPk(gameId);
    //pools of 5card flop + the 2 cards drawn
    const userPool = flop.concat(hand);
    const dealerPool = flop.concat(dealerHand);
    //get the user best hand and the dealers best hand
    const bestUserHand = Hand.solve(userPool);
    const bestDealerHand = Hand.solve(dealerPool);
    bestUserHand.index = 'user';
    bestDealerHand.index = 'dealer';
    //add an index property to the hands to keep track of whats what 
    //strings of descriptions pulled from the poker solver api,
    //need to compare the winning and see if it is dealer or user.  
    //the docs for the poker solverapi are inaccurate- you need to take this step to add a way to track the hands because the function does not return +/-1 like the documents suggest
    //also i think the results it turn may occasionally be off, if i had more time after noticing, i probably would have tried to code my own or find a different library.  
    const userDescript = bestUserHand.descr;
    const dealerDescript = bestUserHand.descr;
    const winner = Hand.winners([bestUserHand, bestDealerHand]);
    res.status(200).send(winner[0].index);

  } catch (err) {
    console.log('winner err', err);
    res.sendStatus(500);
  }
});

Poker.put('/moneyOnTable/:gameId/:moneyOnTable', async (req, res) => {
  try {
    const {gameId, moneyOnTable} = req.params;
    await PokerGames.update({moneyOnTable: moneyOnTable}, {where: {id: gameId}});
    res.sendStatus(203);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//update takehome
Poker.put('/results/:gameId/:takeHome/:net', async (req, res) => {
  try {
    const {gameId, takeHome, net} = req.params;
    await PokerGames.update({takeHome: parseInt(takeHome), netEarnings: parseInt(net)}, {where: {id: gameId}});
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

//update the user bank act
Poker.put('/userBank/:gameId/:net', async (req, res) => {
  try { 
    const {gameId, net} = req.params;
    const {userId} = await PokerGames.findByPk(gameId);
    //update that users money
    const {money} = await User.findByPk(userId);
    await User.update({money: money + parseInt(net)}, {where: {id: userId}});
    res.sendStatus(200);

  } catch (err) {

  }
}); 

//get game stats, 10 best games, ranked by net earnings. 
Poker.get('/history', async (req, res) => {
  try {
    const {id} = req.user;

    //get the 10 games with best net earnings
    const games = await PokerGames.findAll({where: {userId: id}, limit: 10, order: [['netEarnings', 'DESC']]});

    res.status(201).send(games);

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

});

module.exports = {Poker};