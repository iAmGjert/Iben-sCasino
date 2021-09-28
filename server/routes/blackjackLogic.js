const axios = require('axios');
const _ = require('underscore-node');


//helper function to calculate points for a card
/**
 * helper function to calculate points for a card
 * @param {object} card //the card object 
 * @returns value   //a numeric value if it is any card except for ace, returns 'ACE' if it is an ace
 */
const points = (card) => {
  if (parseInt(card.value)) {
    return parseInt(card.value);
  } else if (card.value === 'KING' || card.value === 'QUEEN' || card.value === 'JACK') {
    return 10;
  } else { //ace
    return 'ACE';
  }
};

/**
 * simple function that calculates if blackjack happens (i.e. 21)
 * @param {number} points 
 * @returns {boolean}
 */
const blackJack = (points) => {

  if (points.low === 21 || points.high === 21 || points.bestScore ) {
    return true;
  } else {
    return false;
  }
};

/**
 * helper function runs every time a card is added.  if lowest possible score is >21, then it is a bust
 * @param {number} points 
 * @returns boolean
 */
const bust = (points) => {
  return points.low > 21 ? true : false;
};


/**
 * function to calculate viable possible totals from multiple aces
 * @param {number} n is number, number of aces
 * @returns array of posssible totals, duplicates removed, over 21s removed
 */
const aceOptions = (n) => {
  const outcomes = [];
  const options = [1, 11];

  const combos = (combo = []) => {
    if (combo.length === n) {
      outcomes.push(combo);
      return outcomes;
    }
    options.forEach(option => {
      combos([...combo, option]);
    });
  };
  combos();
  const totals = outcomes.map(combo => combo.reduce((x, y) => x + y));
  return _.uniq(totals).filter(x => x <= 21);

};

/**
 * function that calculates the best score, the score closest to 21 but not over 21
 * @param {array} cardPoints 
 * @returns 
 */
const bestScore = (cardPoints) => {
  //best score is <= 21 and closest to 21
  //const cardPoints = cards.map(card => points(card));
  let total = 0;
  let aces = 0;
  cardPoints.forEach(points => {
    points === 'ACE' ? aces++ : total += points;
  });
  
  //if no aces, return total
  if (!aces) {
    return total;
  } else {
    const aceCombos = aceOptions(aces);
    const combos = aceCombos.map(sum => sum + total).filter(total => total <= 21);
    return Math.max(...combos);

  }
  
};

const handPoints = (cards ) => {
  const pointsMap = cards.map(card => points(card));
  if (pointsMap.includes('ACE')) {
    const total = {};
    total.low = pointsMap.reduce((x, y) => {
      return y === 'ACE' ? x + 1 : x + y;
    }, 0);
    total.high = pointsMap.reduce((x, y) => {
      return y === 'ACE' ? x + 11 : x + y;
    }, 0);
    total.bestScore = bestScore(pointsMap);
    // info[player].points.low = total.low;
    // info[player].points.high = total.high;
    return total;

  } else {
    const low = pointsMap.reduce((x, y) => x + y);
    // info[player].points.low = low;
    return {
      low: low,
      bestScore: bestScore(pointsMap)
    };
  }
};



/**
 * this is the function to initally deal the cards.  creates and shuffles a deck using DoC api, deals 2 cards to the dealer, and 2 to the user.
 * I: n/a
 * O: an object of the dealers hand and the users hand and also the deck id. {dealerHand: [array of 2 cards], userHand: [array of 2 cards], deckId: deck id from api}
 */
const initialDeal = async () => {

  try {    
    const {data} = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'); //6 decks is standard black jack
    const id = data.deck_id; //this will need to be available outside of this scope
    
    const dealer = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`);
    const user = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`);

    const dealerHandCodes = dealer.data.cards.map(card => card.code);
    const userHandCodes = user.data.cards.map(card => card.code);
  

    //create the piles with the api --> cardObj.code is what needs to go in to api call to create pile
    //https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S

    //these piles are with the api, keep track of hands for us.  the id is a parameter ofr each deck, the pilename is user or dealer depending on which pile
    const dealerPile = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/pile/dealer/add/?cards=${dealerHandCodes.join(',')}`);
    const userPile = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/pile/user/add/?cards=${userHandCodes.join(',')}`);

    //get the points for dealer and user

    const dealerPoints = handPoints(dealer.data.cards);
    const userPoints = handPoints(user.data.cards);

    const dealerStand = ((dealerPoints.high >= 17 && dealerPoints.high <= 21) || (dealerPoints.low >= 17 && dealerPoints.low <= 21));
    //clean this up ^ this isnt needed anymore 
    const dealer21 = blackJack(dealerPoints);
    const user21 = blackJack(userPoints);


    

    

    return {
      dealerHand: dealer.data.cards,
      userHand: user.data.cards,
      deckId: id,
      dealerPoints: dealerPoints,
      userPoints: userPoints,
      dealerStand: dealerStand,
      dealer21: dealer21,
      user21: user21,
      dealerFin: dealer21 || user21,
      userFin: dealer21 || user21
    };
  } catch (err) {
    console.log(err);
  }

};

/**
 * This function takes a parametre of deck Id and a string 'user' or 'dealer' and adds a card to the deck of the user or dealer using the DoC api
 * @param {*} deckId 
 * 
 */
const hit = async (deckId, player ) => {

  try {
    //draw one card from the deck
    const draw = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const {code} = draw.data.cards[0];
    
    //add it to the specified player pile
    const add = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/${player}/add/?cards=${code}`);
    const pile = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/${player}/list/`);
    const hand = {};
    hand[player] = pile.data.piles[player].cards;
    //hand is an array of the cards in the user or dealers hand
    //console.log('HAND', hand);
    const points = handPoints(hand[player]);
    const over = bust(points);
    const dealerStand = (points.high >= 17 && points.high <= 21) || (points.low >= 17 && points.low <= 21); //for the dealer automated play, dont refer to this in user in front end , only dealer
    const equal21 = blackJack(points);
    const finished = equal21 || over;
    return {hand: hand, points: points, bust: over, dealerStand: dealerStand, equal21: equal21, finished: finished};

  } catch (err) {
    console.log(err);
  }
 
};


module.exports = {initialDeal, hit};