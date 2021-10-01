const axios = require('axios');
const _ = require('underscore-node');
const {PokerGames} = require('../../../db/index.js');
const {Hand} = require('pokersolver');

//need a function to find the best poker hand.  compare to the ranked list

//need a function to deal.  2 cards to each player, 3 cards up
//userId is passed as a parameter from the routes via the session, x is the single blind
const initialDeal = async (userId, buyIn, x) => {
  try {
    const {data} = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

    const deckId = data.deck_id;

    const flop = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`);
    const dealer = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
    const user = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);

    console.log('d.d.cards', dealer.data.cards);
    //the codes to track the cards
    const dealerHand = dealer.data.cards.map(card => {
      return {code: card.code,
        image: card.image};
    });
    const userHand = user.data.cards.map(card => {
      return {code: card.code,
        image: card.image};
    });
    const flopHand = flop.data.cards.map(card => {
      return {code: card.code,
        image: card.image};
    });

    //create piles on the api
    const dealerPile = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/dealer/add/?cards=${dealerHand.join(',')}`);
    const userPile = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/user/add/?cards=${userHand.join(',')}`);
    const flopPile = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/flop/add/?cards=${flopHand.join(',')}`);

    //dealer bet single blind
    // console.log('dealerPile', dealerPile)

    //user bet dbl blind

    //create new game in the db

    console.log('poker games', PokerGames);
    const newGame = await PokerGames.create({deckId: deckId, buyIn: buyIn, userId: userId });
    //console.log('newGame', newGame);

    return {
      
      dealerHand: dealerHand,
      userHand: userHand,
      flopHand: flopHand,
      gameId: newGame.id,
      deckId: deckId
    
     
      
    };



  } catch (err) {
    console.log(err);
  }
};

//need a function to add to the flop.  called once for the turn (4th card down) and again for hte river(5th and final card down)
const addToFlop = async (gameId, deckId) => {
//if deckId is not passed in, will need to find in PokerGame table via the gameId, but for now assume it is passed in

  const draw = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
  const {code} = draw.data.cards[0];

  //add it to the specified player pile
  const add = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/flop/add/?cards=${code}`);
};


//need a function to place a single blind

const putBet = async (gameId, bet) => {
  //for now find by gameId

  try {
    console.log('putbet');
    const currentGame = await PokerGames.findByPk(gameId);
    console.log('currentGame: ', currentGame);
    //const moT = await currentGame.increment('moneyOnTable', {by: bet});
    const mL = await currentGame.decrement('buyIn', {by: bet});
    const moT = await currentGame.increment('moneyOnTable', {by: bet});
    console.log(mL, moT);

  } catch (err) {
  
  }
};

//need a function to place dbl blind

//need a function to bet/raise

//need a function to stay

//need a functin to fold

module.exports = {initialDeal, putBet};