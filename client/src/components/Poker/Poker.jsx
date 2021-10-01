import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import Flop from './Flop.jsx';
import UserCards from './UserCards.jsx';
import DealerCards from './DealerCards.jsx';

class Poker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userHand: [],
      flopHand: [],
      dealerHand: []
    };
    this.initialDeal = this.initialDeal.bind(this);
  }

  async initialDeal() {
    try {
      const cards = await axios.get('/routes/poker/poker/init');
      console.log(cards);
      return cards.data;

    } catch (err) {
      console.log(err);
    }

  }

  async componentDidMount() {

    try {
      //call initial deal
      console.log('poker component mount');
      const cards = await this.initialDeal();
      const {dealerHand, flopHand, userHand} = cards;
      this.setState({
        dealerHand: dealerHand,
        flopHand: flopHand,
        userHand: userHand
      });
     
      //set the state to display the cards
    } catch (err) {
      console.log(err);
    }
    

  }

  //need to put down blinds.  dealer put down single, user put down dbl blind.  (maybe randomize this) 
  //get request for the /bets

  //after both bets are placed, put down one more card to flop-pile
  //turns for place bet, raise, or fold.

  //put down last acrd to flop pile
  //turns for place bet, raise or fold.
  //for dealer ai--> just raise if rank > 5, fold if < 2, and add randomize parameter alpha to make that less predictable 

  //show cards and calculate best hand

  //if user wins, update the user db .money with earnings




  render() {
    const {dealerHand, flopHand, userHand} = this.state;
    return (
      <div>poker
        <p>
          <DealerCards dealerHand={dealerHand} />
        </p> 
        <p>
          <Flop flopHand={flopHand} />
        </p>
        <p>
          <UserCards userHand={userHand} />
        </p>
       
       
        
      </div>
    );
  }
}

export default Poker;