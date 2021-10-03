const axios = require('axios');
const _ = require('underscore-node');
const {PokerGames} = require('../../../db/index.js');
const {Hand} = require('pokersolver');
const {bestHand} = require('./pokerlogic');


/**call is amount required to call, big blind is amount to raise by.  can raise the bet by big blind */
const dealerBet = async (gameId, call) => {

  try {
  //get the dealers cards
    const game = await PokerGames.findByPk(gameId);
    const dealerHand = game.dealerHand;
    const flop = game.flop;
    const bigBlind = game.bigBlind;
    const pool = dealerHand.concat(flop);

    const best = bestHand(pool).rank;
    /**
     * add randomization factor alpha here that will increase or decrease the best by a random factor to make the bettign strategy slightly less predictable, then set best += alpha
     */

    call = parseInt(call);

    let returnBet; 
    if (best > 8) {
      //raise
      returnBet = {move: 'raise', bet: call + bigBlind};
    } else if (best >= 0) {
      //match
      returnBet = {move: 'call', bet: call};
      
    } else {
      //fold 
      returnBet = {move: 'fold', bet: 0};
    }

    //*NEED TO UPDATE MONEY ON TABLE
    const currentGame = await PokerGames.findByPk(gameId);
    const moneyOnTable = currentGame.moneyOnTable + returnBet.bet;
    console.log('MONEYONTABLE', moneyOnTable, typeof moneyOnTable);
    await PokerGames.update({moneyOnTable: moneyOnTable}, {where: {id: gameId}});

    returnBet.moneyOnTable = moneyOnTable;
    return returnBet;

    //find the best hand, using best hand

  //from the rank-- decide what to do
  } catch (err) {
    console.log('dealerBet err', err);
  }
};

//this is for the dealer bet.  since dealer is casino and has unlimited pool of money, this will just update the PokerGames and add the bet to the money on the table
const dealerBlind = async (gameId, bet) => {
  try {
 
    const currentGame = await PokerGames.findByPk(gameId);

    const mOT = currentGame.moneyOnTable;


    await PokerGames.update({moneyOnTable: mOT + parseInt(bet)}, {where: {id: gameId}});
    return mOT + bet;
  


  } catch (err) {
    console.log(err);
  }

};

module.exports = {dealerBet, dealerBlind};