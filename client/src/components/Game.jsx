import React from 'react';
import 'core-js/stable'; //core-js and regenerator-runtime get rid of errors related to using async/await in react
import 'regenerator-runtime/runtime';
import axios from 'axios';
import Blackjack from './Blackjack/Blackjack.jsx';
import BlackjackStart from './Blackjack/BlackjackStart.jsx';
import styled from 'styled-components';
import { themes } from '../theme-context';

const StyledGame = styled.div`
   h1 {
    color: gold;
    background-color: purple;
    border: 3px solid black;
    border-radius: 3px;
    text-align: center;
    width: 900px;
    margin: auto;
    padding: 15px;
  }
`;



class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'start',
      monies: 0,
      bet: 0,
      name: '',
      theme: themes.light,
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
        monies: money,
        theme: user.data.theme === null ? themes.light 
                : user.data.theme === 'light' ? themes.light 
                : user.data.theme === 'dark' ? themes.dark 
                : themes.light
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
        changeRender={this.changeRender}
     
      />;
    }
    if (view === 'start') {
      return <BlackjackStart monies={this.state.monies} name={this.state.name} placeBet={this.placeBet} betOutcome={this.betOutcome} changeRender={this.changeRender} />;
    }

  }





  render() {
    return (
      <StyledGame style={{...this.state.theme, minHeight: '100vh'}}>
        <h1>{this.state.name}</h1>
        {this.conditionalRender()}
      </StyledGame>
    );
  }

 
} 


export default Game;