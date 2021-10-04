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
      <div>
        
        <h3>{outcome}</h3>
        <div>
          <h4>User: {userScore} dealer: {dealerScore}</h4>
          <h3>winner: {winner}</h3>
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