import React from 'react';
import { render } from 'react-dom';

class BlackjackStart extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
      available: this.props.monies,
      currentBet: 0
    };
    this.increaseBet = this.increaseBet.bind(this);
    this.removeChip = this.removeChip.bind(this);
  }

  /**
   * I: x is the amount to increase bet by,  corresponds to chip
   * O: n/a but adjusts available money and changes the current bet
   */
  increaseBet(x) {
    if (x < this.state.available) {
      this.setState({
        available: this.state.available - x,
        currentBet: this.state.currentBet + x
      });
    }
  }

  /**
   * I: x is the amount to decrease bet by,  corresponds to chip
   * O: n/a but adjusts available money and changes the current bet
   */
  removeChip(x) {
    this.setState({
      available: this.state.available + x,
      currentBet: this.state.currentBet - x
    });
  }

  render() {
    const {changeRender, placeBet} = this.props;
    const {available, currentBet} = this.state;
    return (
      <div>
        <p>current bet: {currentBet}</p>
        <p>available monies left: {available}</p>
        <button 
          style={{display: 5 < available ? 'block' : 'none'}} 
          value={5} 
          onClick={()=>this.increaseBet(5)}
        >5</button>
        <button 
          style={{display: 10 < available ? 'block' : 'none'}} 
          value={10}
          onClick={()=>this.increaseBet(10)}
        >10</button>
        <button 
          style={{display: 100 < available ? 'block' : 'none'}} 
          onClick={()=>this.increaseBet(100)}
          value={100}
        >100</button>
        <button bet={currentBet} onClick={()=> {
          changeRender('blackjack');
          placeBet(currentBet);
        }}>place bet </button>
      </div>
    );
  }
 
}

export default BlackjackStart;