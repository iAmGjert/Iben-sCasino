import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Blackjack from './Blackjack/Blackjack.jsx';
import BlackjackStart from './Blackjack/BlackjackStart.jsx';



class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'start',
      monies: 50,
      bet: 0
    };
    this.renderView = this.conditionalRender.bind(this);
    this.changeRender = this.changeRender.bind(this);
    this.placeBet = this.placeBet.bind(this);
    this.betOutcome = this.betOutcome.bind(this);
  }

  //function to change the view so render will render conditionally

  changeRender(view) {
    this.setState({
      view: view
    });
  }

  

  placeBet(x) {
    this.setState({
      bet: x
    });
  }

  async betOutcome(x) {
    //x is +/- 1 or 0 depend on win/lose/draw
    console.log('bet outcome');
    this.setState({
      monies: this.state.monies + x * this.state.bet,
      bet: 0
    });
    //need backend part to adjust the bank in the db
    try {
      await axios.put(`/routes/blackjack/bet/${5}`);
      console.log('money: ', this.state.monies);
    } catch (err) {
      console.log('betOutcome err', err);
    }
  }

  //make a conditional render here.

  conditionalRender() {
    const {view} = this.state;

    if (view === 'blackjack') {
      return <Blackjack 
        bet={this.state.bet}
        betOutcome={this.betOutcome}
     
      />;
    }
    if (view === 'start') {
      return <BlackjackStart monies={this.state.monies} placeBet={this.placeBet} betOutcome={this.betOutcome} changeRender={this.changeRender} />;
    }

  }





  render() {
    return (
      <div>
        {this.conditionalRender()}
      </div>
    );
  }

 
} 


export default Game;