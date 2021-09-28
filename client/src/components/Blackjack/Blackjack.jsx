import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import axios from 'axios';

import BlackjackDealer from './BlackjackDealer.jsx';
import BlackjackUser from './BlackjackUser.jsx';
import Finished from './Finished.jsx';

class Blackjack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dealerHand: [],
      userHand: [],
      deckId: '',
      userPoints: {low: 0, bestScore: 0},
      dealerPoints: {low: 0, bestScore: 0},
      dealer21: false, //true if 21 is points
      user21: false, //true if points are 21,
      dealerBust: false, //true if dealer busts (>21 on the low points)
      userBust: false, //true if user busts (>21 on the low pts)
      dealerFin: false, // true if hits 21, over 21 (on the low.  i.e. cant play anymore)
      userFin: false, //true if hits 21 or over 21 (on the low),
      dealerStand: false, //this is true when the cards is >= 17 && <=21.  ace always treated as 11 for this. 
      userStand: false, //user decide to stay
      finished: false, //the game is finished -- either user or dealer reaches 21, user busts, dealer busts, or both players stand and best score wins

      

    };
    this.initialDeal = this.initialDeal.bind(this);
    this.userHitCard = this.userHitCard.bind(this);
    this.dealerHitCard = this.dealerHitCard.bind(this);
    this.userStand = this.userStand.bind(this);
  }

  /**
   * a initialDeal function that deals cards.
   * @returns the cards to be distributed
   * this initialDeal is attatched to the deal button
   *    * 
   */

  async initialDeal() {
    try {
      const data = await axios.get('/routes/blackjack');
      this.setState({
        dealerHand: data.data.dealerHand,
        userHand: data.data.userHand,
        deckId: data.data.deckId,
        userPoints: data.data.userPoints,
        dealerPoints: data.data.dealerPoints,
        dealerStand: data.data.dealerStand,
        user21: data.data.user21,
        dealer21: data.data.dealer21,
        dealerFin: data.data.dealerFin,
        userFin: data.data.userFin,
        finished: data.data.user21 || data.data.dealer21
 
      });
      return;
    } catch (err) {
      console.log(err);
    }
  }

  //have the cards dealt load on component mounting
  componentDidMount() {
    this.initialDeal();
  }

  /**
   * this is a function to add a card for the user.  makes a get req to the server side which draws a card.  updates the state
 
   */
  async userHitCard() {
    try {
      const hand = await axios.get(`/routes/blackjack/hit/${this.state.deckId}&user`);
  
      this.setState({
        userHand: hand.data.hand.user,
        userPoints: hand.data.points,
        userBust: hand.data.bust,
        user21: hand.data.equal21,
        userFin: hand.data.finished,
        finished: hand.data.bust || hand.data.equal21 || (hand.data.finished && this.state.dealerFin)
      });

    } catch (err) {
      console.log('err in userHitCard', err );
    }
  }

  /**
   * user decides to stay with their hand.  updates the state, calls the function for the dealer to take their turn
   */
  async userStand() {
    try {
      this.setState({
        userStand: true,
        userFin: true,
        finished: this.state.dealerStand
      });

      if (this.state.dealerStand) {
        return;
      } else {
        //then we need to do the this.dealerHitCard
        return await this.dealerHitCard();
      }
 

    } catch (err) {
      console.log(err);
    }
  }

  //this is going to need to become automatic
  async dealerHitCard() { 
    const {dealerStand, dealerBust, dealer21} = this.state;
    if (dealerStand === false && dealerBust === false && dealer21 === false) {
      try {
        const hand = await axios.get(`/routes/blackjack/hit/${this.state.deckId}&dealer`);
        this.setState({
          dealerHand: hand.data.hand.dealer,
          dealerPoints: hand.data.points,
          dealerBust: hand.data.bust,
          dealerStand: hand.data.dealerStand,
          dealer21: hand.data.equal21
        });
        return await this.dealerHitCard();
      } catch (err) {
        console.log('err in dealerHitCard', err);
      }

    } else { //if dealer stand is true
      this.setState({
        dealerFin: true,
        finished: this.state.userFin 
      });

      return;
    }
   
  }




  render() {
    const {dealerHand, userHand, user21, userBust, userStand, dealer21, dealerBust, finished, userPoints, dealerPoints} = this.state;
    const {betOutcome} = this.props;

    let FinishedSpace; //this will conditionally render <FinishedSpace /> when the game finishes

    //conditionals for properties of finished games to be passed down to Finished component
    const results = {};
    if (user21 && dealer21) {
      results.outcome = 'blackjack for both'; 
      results.winner = 'draw'; 
      results.betOutcome = betOutcome;
      results.userScore = userPoints.bestScore;
      results.dealerScore = dealerPoints.bestScore;
    } else if (user21) {
      results.winner = 'user'; 
      results.betOutcome = betOutcome;
      results.userScore = userPoints.bestScore;
      results.dealerScore = dealerPoints.bestScore;
      results.outcome = 'blackjack for user';
    } else if (dealer21) {
      results.winner = 'dealer'; 
      results.betOutcome = betOutcome;
      results.userScore = userPoints.bestScore; 
      results.dealerScore = dealerPoints.bestScore;
      results.outcome = 'blackjack for dealer';
    } else if (userBust) {
      results.winner = 'dealer'; 
      results.betOutcome = betOutcome;
      results.userScore = userPoints.bestScore;
      results.dealerScore = dealerPoints.bestScore;
      results.outcome = 'user busts';
    } else if (dealerBust) {
      results.winner = 'user'; 
      results.betOutcome = betOutcome;
      results.userScore = userPoints.bestScore; 
      results.dealerScore = dealerPoints.bestScore;
      results.outcome = 'dealer busts';
    } else if (finished) {
      results.winner = (
        userPoints.bestScore > dealerPoints.bestScore ? 'user' :
          userPoints.bestScore < dealerPoints.bestScore ? 'dealer' : 'draw'
      ); 
      results.userScore = userPoints.bestScore; 
      results.betOutcome = betOutcome;
      results.dealerScore = dealerPoints.bestScore;
      results.outcome = 'finish';
    } 

    if (finished) {
      FinishedSpace = <Finished results={results}/>;
    }
  

    return (
      <div>blackjack div
        <div>cards</div>
        <button style={{display: userBust || userStand ? 'none' : 'block'}} onClick={this.userHitCard}>user hit card</button>
        <button style={{display: userStand || finished ? 'none' : 'block'}} onClick={this.userStand}>user stand</button>
        <BlackjackDealer dealerHand={dealerHand} />
        <BlackjackUser userHand={userHand} />
        {FinishedSpace}
        
      </div>
    );
  }
}

export default Blackjack;