import axios from 'axios';
import React from 'react';
import Poker from './Poker/Poker.jsx';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import styled from 'styled-components';
import PokerStart from './Poker/PokerStart.jsx';

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
  h2 {
    color: purple;
    background-color: #726730;
    border: 3px solid black;
    border-radius: 3px;
    text-align: center;
    width: 750px;
    margin: auto;
    padding: 15px;
    
  }
  h3 {
    color: gold;
    background-color: purple;
    border: 3px solid black;
    border-radius: 4px;
    text-align: center;
    width: 600px;
    margin: auto 20px;

    padding: 15px;
  }
  h4 {
    color: gold;
    background-color: purple;
    border: 3px solid gold;
    border-radius: 4px;
    text-align: center;
 
    margin: auto;
    padding: 15px;
  }
  button {
    background-color: purple;
    color: gold;
    border: 3px solid gold;
    border-radius: 5px;
    height: 70px;
    width: 140px;
    margin: 10px;
      :hover {
        background-color: lavender;
        cursor: pointer;
      }
  }

`;

class PokerGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'start',
      user: {
        name: ''
      },
      bigBlind: 10,
      buyIn: 50,
      userMoney: 0,
      userName: '',
      history: []
    };
    this.changeView = this.changeView.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);
    this.setInitialMoney = this.setInitialMoney.bind(this);
    this.getHist = this.getHist.bind(this);
  }

  //conditional render.  for the start page when buy in.
  async componentDidMount() {
    try {
      const user = await axios.get('/routes/profile/user'); 
      this.setState({
        userMoney: user.data.money, //set with the usermoney in the bank
        userName: user.data.name
      }, );
      await this.getHist();
    } catch (err) {
      console.log('PokerGame mount err', err );
    }
    
  }

  async getHist () {
    try {
      const {data} = await axios.get('/routes/poker/poker/history');
      // console.log(hist.data)
      const gameData = data.map(gameObj => {
        return {
          netEarnings: gameObj.netEarnings, 
          takeHome: gameObj.takeHome, 
          bigBlind: gameObj.bigBlind
        };
      });

      this.setState({
        history: gameData
      });
    } catch (err) {
      console.log(err);
    }
  }

  changeView(view) {
    this.setState({
      view: view
    });
  }

  //this sets the initial buyIn and bigBlind in the state, when the starting screen chooses the buy insand big blinds
  setInitialMoney(buyIn, bigBlind) {

    this.setState({
      buyIn: buyIn,
      bigBlind: bigBlind
    });

  }


  conditionalRender() {
    const {view, bigBlind, buyIn, userMoney, userName, history} = this.state;
    if (view === 'start') {
      return <PokerStart setInitialMoney={this.setInitialMoney} changeView={this.changeView} userMoney={userMoney} userName={userName} history={history} />;
    }
    if (view === 'poker') {
      return <Poker bigBlind={bigBlind} buyIn={buyIn} changeView={this.changeView} />;
    }
  }

  
  render() {
    const {name} = this.state;
    return ( 
      <StyledGame>
        <h1>{name}</h1>
        {this.conditionalRender()}
      </StyledGame>);
  }
}


export default PokerGame;