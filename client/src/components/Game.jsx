import React from 'react';
import Blackjack from './Blackjack.jsx';
import BlackjackStart from './BlackjackStart.jsx';



class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'start'
    };
    this.renderView = this.conditionalRender.bind(this);
    this.changeRender = this.changeRender.bind(this);
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
      return <Blackjack />;
    }
    if (view === 'start') {
      return <BlackjackStart changeRender={this.changeRender} />;
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