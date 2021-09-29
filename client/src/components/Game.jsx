import React from 'react';
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
      return <BlackjackStart monies={this.state.monies} placeBet={this.placeBet} changeRender={this.changeRender} />;
    }

  }

  placeBet(x) {
    this.setState({
      bet: x
    });
  }

  betOutcome(x) {
    //x is +/- 1 or 0 depend on win/lose/draw
    this.setState({
      monies: this.state.monies + x * this.state.bet,
      bet: 0
    });
    //need backend part to adjust the bank in the db

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