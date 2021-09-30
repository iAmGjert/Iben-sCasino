import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import Blackjack from './Blackjack/Blackjack.jsx';
import BlackjackStart from './Blackjack/BlackjackStart.jsx';



class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'start',
      monies: 0,
      bet: 0,
      name: ''
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

  betOutcome(x) {
    //x is +/- 1 or 0 depend on win/lose/draw
  
    const delta = x * this.state.bet; //delta is change in money
    this.setState({
      monies: this.state.monies + x * this.state.bet,
      bet: 0
    });
    //need backend part to adjust the bank in the db
    axios.put(`/routes/blackjack/bet/${delta}`)
      .then(x => console.log(x))
      .catch(err => console.log(err));
  }

  async componentDidMount() {
    //get request to get the user

    try {
      const user = await axios.get('/routes/profile/user');
      const {name, money} = user.data;
      //  console.log('money', money)
      this.setState({
        name: name,
        monies: money
      });
    } catch (err) {
      console.log('game mount err', err);
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
        <h1>{this.state.name}</h1>
        {this.conditionalRender()}
      </div>
    );
  }

 
} 


export default Game;