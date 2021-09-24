import React from 'react';
import "core-js/stable";
import "regenerator-runtime/runtime";
import axios from 'axios';

class Blackjack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      console.log(data)
      return;
    } catch (err) {
      console.log(err)
    }
    

  }


  render() {
    return (
      <div>blackjack div
        <div>cards</div>
        <button onClick={this.handleClick}>deal</button>
      </div>
    )
  }
}

export default Blackjack;