import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class BlackjackStart extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
      available: 0,
      currentBet: 0
    };
    this.increaseBet = this.increaseBet.bind(this);
    this.removeChip = this.removeChip.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);
  }

  /**
   * I: x is the amount to increase bet by,  corresponds to chip
   * O: n/a but adjusts available money and changes the current bet
   */
  increaseBet(x) {
    //console.log('incbet', x, this.props.monies)
    if (x < this.props.monies) {
      this.setState({
        available: this.props.monies - x,
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
      available: this.props.monies + x,
      currentBet: this.state.currentBet - x
    });
  }
  // conditional render to display button if logged in/ logged out
  conditionalRender() {
    const {changeRender, placeBet, monies, name} = this.props;
    console.log('name:', name);
    const { available, currentBet} = this.state;
    if (name === '' || name === undefined) {
      return (
        <div className='card-panel green darken-2'>
          <h2><em>You must log in to play the game!!!</em></h2>
          
        </div>
      );
    } else {
      return (
        <div>
          <button 
            style={{display: 5 < monies ? 'block' : 'none'}} 
            value={5} 
            onClick={()=>this.increaseBet(5)}
          >5</button>
          <button 
            style={{display: 10 < monies ? 'block' : 'none'}} 
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

  componentDidMount() {

    this.setState({
      available: this.props.monies
    });
  }

  render() {
    const {changeRender, placeBet, monies, name} = this.props;
    
    const { available, currentBet} = this.state;
    return (
      <div>
        <p>current bet: {currentBet}</p>
        <p>available monies left: {available}</p>
        
        {this.conditionalRender()}
      </div>
    );
  }
 
}

export default BlackjackStart;