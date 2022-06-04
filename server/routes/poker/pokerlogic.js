const axios = require('axios');
const _ = require('underscore-node');
const {PokerGames} = require('../../../db/index.js');
const {Hand} = require('pokersolver');

//need a function to find the best poker hand.  compare to the ranked list

//need a function to deal.  2 cards to each player, 3 cards up
//userId is passed as a parameter from the routes via the session, 
const initialDeal = async (userId, buyIn, bigBlind) => {
  try {
    const {data} = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

    const deckId = data.deck_id;

    const flop = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`);
    const dealer = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
    const user = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);

    //the codes to track the cards
    const dealerHand = dealer.data.cards.map(card => {
    //  console.log(card.code);
      return {code: card.code,
        image: card.image};
    });
    const userHand = user.data.cards.map(card => {
      // console.log(card.code);
      return {code: card.code,
        image: card.image};
    });
    const flopHand = flop.data.cards.map(card => {
      // console.log(card.code);
      return {code: card.code,
        image: card.image};
    });

    //create piles on the api
    const dealerPile = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/dealer/add/?cards=${dealerHand.join(',')}`);
    const userPile = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/user/add/?cards=${userHand.join(',')}`);
    const flopPile = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/flop/add/?cards=${flopHand.join(',')}`);
    //create new game in the db
    const newGame = await PokerGames.create({deckId: deckId, buyIn: buyIn, bigBlind: bigBlind, userId: userId, hand: userHand.map(x => x.code), dealerHand: dealerHand.map(x => x.code), flop: flopHand.map(x => x.code)});
    //console.log('newGame', newGame);

    return {
      dealerHand: dealerHand,
      userHand: userHand,
      flopHand: flopHand,
      gameId: newGame.id,
      deckId: deckId,
    };



  } catch (err) {
    console.log(err);
  }
};

//need a function to add to the flop.  called once for the turn (4th card down) and again for hte river(5th and final card down)
const addToFlop = async (gameId) => {
//if deckId is not passed in, will need to find in PokerGame table via the gameId, but for now assume it is passed in
  const {deckId, flop} = await PokerGames.findByPk(gameId);
  //console.log('DECK ID !!!! !!!!! ', deckId);
  const draw = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
  const {code, image} = draw.data.cards[0];

  //add it to the specified player pile
  const add = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/flop/add/?cards=${code}`);
  //Add it to the flip in the db
  //console.log('flop', flop);
  const newFlop = flop.concat(code);
  await PokerGames.update({flop: newFlop}, {where: {id: gameId}});


  return {
    code: code,
    image: image
  };
};


//need a function to place a single bet

const putBet = async (gameId, bet) => {
  //for now find by gameId

  try {
    console.log('putbet');
    const currentGame = await PokerGames.findByPk(gameId);
    // console.log('currentGame: ', currentGame)
    //const moT = await currentGame.increment('moneyOnTable', {by: bet});
    const mL = await currentGame.decrement('buyIn', {by: bet});
    const moT = await currentGame.increment('moneyOnTable', {by: bet});
    // console.log(mL, moT);

  } catch (err) {
  
  }
};

/**
 * functions to choose best poker hand.
 * this uses library poker-solver.  
 * -->const bestHand = Hand.solve([array of codes])
 * --> the array of codes parameter needs to be passed in in format Ad, Jc, etc, and 10 is passed in as a capital T...i.e. 10 of clubs is Tc
 * 
 */

//helper function to get the  card code string to be compatible with teh poker-solver library
const restring = (string) => {
  //deck of cardsApi uses a 0 for 10
  const stringArr = string.split('');
  if (stringArr[0] === '0') {
    stringArr[0] = 'T';
  }
  const lc = stringArr[1].toLowerCase();
  const newStr = stringArr[0] + lc;
  return newStr;

};

//for an array of codes -> to be compatible for poker solver
const shiftCodes = (arr) => {
  return arr.map(code => restring(code));
};

//I: hand is an array of codes
//O: an object that has property bestHand which is array of codes and rank which is hte rank in hands where 0 is the lowest rank 
const bestHand = (hand) => {
  const shiftedHand = shiftCodes(hand);
  const {rank} = Hand.solve(shiftedHand);
  const best = Hand.solve(shiftedHand).cards.map(card => card.value + card.suit);
  return {
    bestHand: best,
    rank: rank
  };
};


module.exports = {initialDeal, putBet, bestHand, addToFlop};