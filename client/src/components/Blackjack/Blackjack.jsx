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
      userPoints: {low: 0},
      dealerPoints: {low: 0},
      dealer21: false, //true if 21 is points
      user21: false, //true if points are 21,
      dealerBust: false, //true if dealer busts (>21 on the low points)
      userBust: false, //true if user busts (>21 on the low pts)
      dealerFin: false, // true if hits 21, over 21 (on the low.  i.e. cant play anymore)
      userFin: false, //true if hits 21 or over 21 (on the low),
      dealerStand: false, //this is true when the cards is >= 17 && <=21.  ace always treated as 11 for this. 
      userStand: false,
      finished: false
      

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
        finished: hand.data.bust || hand.data.equal21
      });

    } catch (err) {
      console.log('err in userHitCard', err );
    }
  }

  async userStand() {
    try {
      this.setState({
        userStand: true,
        userFin: true
      });

    //then we need to do the this.dealerHitCard
      return await this.dealerHitCard();

    } catch (err) {
      console.log(err);
    }
  }

  //this is going to need to become automatic
  async dealerHitCard() { 
    console.log('dhc');
    const {dealerStand, dealerBust, dealer21} = this.state;
    console.log('this.state in dhc', this.state);
    if (dealerStand === false && dealerBust === false && dealer21 === false) {
      try {
        const hand = await axios.get(`/routes/blackjack/hit/${this.state.deckId}&dealer`);
        console.log('dealer hand: ', hand);
        this.setState({
          dealerHand: hand.data.hand.dealer,
          dealerPoints: hand.data.points,
          dealerBust: hand.data.bust,
          dealerStand: hand.data.dealerStand,
          dealer21: hand.data.equal21
        });
        console.log('thissstate', this.state);
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
    const {dealerHand, userHand, userBust, userStand, finished} = this.state;
    console.log('finished', finished)
   let FinishedSpace;
    if(finished) {
      FinishedSpace = <Finished />;
    } else {
      FinishedSpace = <div>not finished</div>
    }
    return (
      <div>blackjack div
        <div>cards</div>
    
        <button style={{display: userBust || userStand ? 'none' : 'block'}} onClick={this.userHitCard}>user hit card</button>
    
        <button onClick={this.userStand}>user stand</button>
        <BlackjackDealer dealerHand={dealerHand} />
        <BlackjackUser userHand={userHand} />
       {FinishedSpace}
        
      </div>
    );
  }
}

export default Blackjack;