import React from 'react';
import axios from 'axios';

class Finished extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const {winner, betOutcome} = this.props.results;
    const n = winner === 'user' ? 1 :
      winner === 'dealer' ? -1 : 0; 
    betOutcome(n);
  }

  render() {
    const {outcome, userScore, dealerScore, winner} = this.props.results;
    return (
      <div>gameover
        
        <h1>{outcome}</h1>
        <div>
            UserScore: {userScore} dealerScore: {dealerScore}
            winner: {winner}
        </div>
        <div>
          <button 
            onClick={()=>{
              this.props.changeRender('start');
            }}
          >new game</button>
        </div>
        
      </div>
    );
  }
 
}

export default Finished; 