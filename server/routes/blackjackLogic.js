const axios = require('axios');

//const testId = 'y210y3onuiww'

/**
 * this is the function to initally deal the cards.  creates and shuffles a deck using DoC api, deals 2 cards to the dealer, and 2 to the user.
 * I: na/a
 * O: an object of the dealers hand and the users hand and also the deck id. {dealerHand: [array of 2 cards], userHand: [array of 2 cards], deckId: deck id from api}
 */
const initialDeal = async () => {

  try {
    
    const {data} = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')    //6 decks is standard black jack
    const id = data.deck_id; //this will need to be available outside of this scope
    
  // const id = testId
    const dealer = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`)
    const user = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`)

    const dealerHandCodes = dealer.data.cards.map(card => card.code)
    const userHandCodes = user.data.cards.map(card => card.code)
  

    //create the piles with the api --> cardObj.code is what needs to go in to api call to create pile
    //https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S

    //these piles are with the api, keep track of hands for us.  the id is a parameter ofr each deck, the pilename is user or dealer depending on which pile
    const dealerPile = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/pile/dealer/add/?cards=${dealerHandCodes.join(',')}`)
    const userPile = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/pile/user/add/?cards=${userHandCodes.join(',')}`)


    

    return {
      dealerHand: dealer.data.cards,
      userHand: user.data.cards,
      deckId: id
    };
  }
  catch (err) {
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
    const draw = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    const {code} = draw.data.cards[0];
    
    //add it to the specified player pile
    const add = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/${player}/add/?cards=${code}`)
    const pile = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/pile/${player}/list/`)
    const hand = {};
    hand[player] = pile.data.piles[player].cards;
    //hand is an array of the cards in the user or dealers hand
    return hand;

  }
  catch (err) {
    console.log(err)
  }
 
}

//helper function to calculate points for a card
const points = (card) => {
  if(parseInt(card.value)) {
    return parseInt(card.value)
  } else if (card.value === 'KING' || card.value === 'QUEEN' || card.value === 'JACK') {
    return 10;
  } else {//ace
    return 'ACE'
  }
}

//function to return the total of points for a hand
//the low is if ace is counted as 1
//high if ace is counted as 11

const handPoints = (cards) => {
  const pointsMap = cards.map(card => points(card));
  if (pointsMap.includes('ACE')) {
    const total = {}
    total.low = pointsMap.reduce((x, y) => {
      return y === 'ACE' ? x + 1 : x + y;
    }, 0)
    total.high = pointsMap.reduce((x, y) => {
      return y === 'ACE' ? x + 11 : x + y;
    }, 0)

    return total;

  } else {
    return {
      low: pointsMap.reduce((x, y) => x + y)
    };
  }
}

//this will be a function to calculate the score closest to 21.  NEEDS TO ACCOUNT FOR MULTIPLE ACES!!!
const bestScore = () => {

}

console.log(handPoints([{value: 'ACE'}, {value: 'QUEEN'}]))

module.exports = {initialDeal, hit}