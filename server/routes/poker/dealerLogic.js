const axios = require('axios');
const _ = require('underscore-node');
const {PokerGames} = require('../../../db/index.js');
const {Hand} = require('pokersolver');
const {bestHand} = require('./pokerlogic');

const dealerBet = async (gameId) => {

  try {
  //get the dealers cards
    const game = await PokerGames.findByPk(gameId);
    const dealerHand = game.dealerHand;
    const flop = game.flop;
    const pool = dealerHand.concat(flop);

    const best = bestHand(pool);

    if (best > 8) {
      //raise
    } else if (best > 3) {
      //match
    } else {
      //fold 
    }



    //find the best hand, using best hand

  //from the rank-- decide what to do
  } catch (err) {
    console.log('dealerBet err', err);
  }
};

module.exports = {dealerBet};