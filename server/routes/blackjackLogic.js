const axios = require('axios');

const testId = 'd68jwu1mxj8h'

/**
 * this is the function to initally deal the cards.  creates and shuffles a deck using DoC api, deals 2 cards to the dealer, and 2 to the user.
 * I: na/a
 * O: an object of the dealers hand and the users hand and also the deck id. {dealerHand: [array of 2 cards], userHand: [array of 2 cards], deckId: deck id from api}
 */
const initialDeal = async () => {
  console.log('fetch')

  try {
    /*
    const {data} = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')    //6 decks is standard black jack
    console.log('data', data.deck_id)
    const id = data.deck_id; //this will need to be available outside of this scope
    */ 
   const id = testId
    const dealer = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`)
    const user = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`)

    console.log('dealer', dealer.data.cards, 'user', user.data.cards)
    const dealerHandCodes = dealer.data.cards.map(card => card.code)
    const userHandCodes = user.data.cards.map(card => card.code)
    console.log('dealerHand codes', dealerHandCodes, 'userHand codes', userHandCodes)

    //create the piles with the api --> cardObj.code is what needs to go in to api call to create pile
    //https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S

    //these piles are with the api, keep track of hands for us.  the id is a parameter ofr each deck, the pilename is user or dealer depending on which pile
    const dealerPile = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/pile/dealer/add/?cards=${dealerHandCodes.join(',')}`)
    const userPile = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/pile/user/add/?cards=${userHandCodes.join(',')}`)

    console.log('piles', dealerPile.data, userPile.data)
    

    return {
      dealerHand: dealer.data.cards,
      userHand: user.data.cards,
      deckId: id
    }
  }
  catch (err) {
    console.log(err)
  }

}

//initialDeal()

module.exports = {initialDeal}