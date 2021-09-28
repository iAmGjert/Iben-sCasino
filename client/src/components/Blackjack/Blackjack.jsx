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
      userStand: false,
      finished: false,

      

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
      //console.log('d.dh', data.data.dealerHand, 'd.uH', data.data.userHand, data);

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

      
      console.log('thisstate', this.state);
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
   * this is a function to add a card for the user
 
   */
  async userHitCard() {
    try {
      const hand = await axios.get(`/routes/blackjack/hit/${this.state.deckId}&user`);
      console.log('HAND!', hand, hand.data.hand.user);
  
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

    let FinishedSpace;
    if (user21 && dealer21) {
      FinishedSpace = <Finished 
        outcome='blackjack for both' 
        winner="draw" 
        betOutcome={betOutcome}
        userScore={userPoints.bestScore} 
        dealerScore={dealerPoints.bestScore}/>;
    } else if (user21) {
      FinishedSpace = <Finished 
        winner="user" 
        betOutcome={betOutcome}
        userScore={userPoints.bestScore} 
        dealerScore={dealerPoints.bestScore}
        outcome='blackjack for user' />;
    } else if (dealer21) {
      FinishedSpace = <Finished 
        winner="dealer" 
        betOutcome={betOutcome}
        userScore={userPoints.bestScore} 
        dealerScore={dealerPoints.bestScore}
        outcome='blackjack for dealer' />;
    } else if (userBust) {
      FinishedSpace = <Finished 
        winner="dealer" 
        betOutcome={betOutcome}
        userScore={userPoints.bestScore} 
        dealerScore={dealerPoints.bestScore}
        outcome='user busts' />;
    } else if (dealerBust) {
      FinishedSpace = <Finished 
        winner="user" 
        betOutcome={betOutcome}
        userScore={userPoints.bestScore} 
        dealerScore={dealerPoints.bestScore}
        outcome='dealer busts' />;
    } else if (finished) {
      FinishedSpace = <Finished 
        winner={
          userPoints.bestScore > dealerPoints.bestScore ? 'user' :
            userPoints.bestScore < dealerPoints.bestScore ? 'dealer' : 'draw'
        } 
        userScore={userPoints.bestScore} 
        betOutcome={betOutcome}
        dealerScore={dealerPoints.bestScore}
        outcome = 'finish' />;
    } else {
      FinishedSpace = <div>not finished</div>;
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