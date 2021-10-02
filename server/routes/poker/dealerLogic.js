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

    const best = bestHand(pool);
    /**
     * add randomization factor alpha here that will increase or decrease the best by a random factor to make the bettign strategy slightly less predictable, then set best += alpha
     */

    if (best > 8) {
      //raise
      return {move: 'raise', bet: call + bigBlind};
    } else if (best > 3) {
      //match
      return {move: 'call', bet: call};
      

    } else {
      //fold 
      return {move: 'fold', bet: 0};
    }



    //find the best hand, using best hand

  //from the rank-- decide what to do
  } catch (err) {
    console.log('dealerBet err', err);
  }
};

//this is for the dealer bet.  since dealer is casino and has unlimited pool of money, this will just update the PokerGames and add the bet to the money on the table
const dealerBlind = async (gameId, bet) => {
  try {
    const currentGame = PokerGames.findByPk(gameId)
    const mOT = currentGames.moneyOnTable

    await PokerGames.update({money: mOT + bet}, {where: {gameId: id}})


  } catch (err) {
    console.log(err)
  }

}

module.exports = {dealerBet, dealerBlind};