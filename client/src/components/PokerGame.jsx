import axios from 'axios';
import React from 'react';
import Poker from './Poker/Poker.jsx';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import PokerStart from './Poker/PokerStart.jsx';

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
      userMoney: 0
    };
    this.changeView = this.changeView.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);
    this.setInitialMoney = this.setInitialMoney.bind(this);
  }

  //conditional render.  for the start page when buy in.
  async componentDidMount() {
    try {
      const user = await axios.get('/routes/profile/user'); 
      this.setState({
        userMoney: user.data.money //set with the usermoney in the bank
      }, () => console.log(this.state));
    } catch (err) {
      console.log('PokerGame mount err', err );
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
    console.log('setInitialMoney;', buyIn, bigBlind);
  }


  conditionalRender() {
    const {view, bigBlind, buyIn, userMoney} = this.state;
    if (view === 'start') {
      return <PokerStart setInitialMoney={this.setInitialMoney} changeView={this.changeView} userMoney={userMoney} />;
    }
    if (view === 'poker') {
      return <Poker bigBlind={bigBlind} buyIn={buyIn} />;
    }
  }

  
  render() {
    const {name} = this.state;
    return ( 
      <div>
        <h1>{name}</h1>
        {this.conditionalRender()}
      </div>);
  }
}


export default PokerGame;