import React from 'react';
import "core-js/stable";
import "regenerator-runtime/runtime";
import axios from 'axios';

import BlackjackDealer from './BlackjackDealer.jsx';
import BlackjackUser from './BlackjackUser.jsx';

class Blackjack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dealerHand: [],
      userHand: [],
    };
    this.handleClick = this.handleClick.bind(this)
  }

  /**
   * a handleClick function that deals cards.
   * @returns the cards to be distributed
   * this handleClick is attatched to the deal button
   *    * 
   */

  async handleClick() {
    try {
      console.log('click')
      const data = await axios.get('/routes/blackjack');
      console.log('d.dh', data.data.dealerHand, 'd.uH', data.data.userHand, data)

      await this.setState({
        dealerHand: data.data.dealerHand,
        userHand: data.data.userHand
      })
      console.log('thisstate', this.state)
      return;
    } catch (err) {
      console.log(err)
    }
    

  }


  render() {
    const {dealerHand, userHand} = this.state
    return (
      <div>blackjack div
        <div>cards</div>
        <button onClick={this.handleClick}>deal</button>
        <BlackjackDealer dealerHand={dealerHand} />
        <BlackjackUser userHand={userHand} />
      </div>
    )
  }
}

export default Blackjack;