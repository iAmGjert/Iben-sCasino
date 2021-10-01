import React from 'react';
import Poker from './Poker/Poker.jsx';

class PokerGame extends React.Component {
  constructor(props) {
    super(props);
    this.stage = {};
  }

  render() {
    return ( 
      <div>
      this is a poker game
        <Poker />
      </div>);
  }
}


export default PokerGame;