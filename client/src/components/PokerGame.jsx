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
      buyIn: 50
    };
    this.changeView = this.changeView.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);
  }

  //conditional render.  for the start page when buy in.
  async componentDidMount() {
    try {
      const user = await axios.get('/routes/profile/user'); 
    } catch (err) {
      console.log('PokerGame mount err', err );
    }
    
  }

  changeView(view) {
    this.setState({
      view: view
    });
  }

  conditionalRender() {
    const {view} = this.state;
    if (view === 'start') {
      return <PokerStart />;
    }
    if (view === 'poker') {
      return <Poker />;
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