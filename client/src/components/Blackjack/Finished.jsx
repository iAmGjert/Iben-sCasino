import React from 'react';

class Finished extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    //logic for who wins here
    const {winner, betOutcome} = this.props;
    const n = winner === 'user' ? 1 :
      winner === 'dealer' ? -1 : 0; 
    betOutcome(n);
  }

  render() {
    const {outcome, userScore, dealerScore, winner} = this.props;
    return (
      <div>gameover
        <h1>{outcome}</h1>
        <div>
            UserScore: {userScore} dealerScore: {dealerScore}
            winner: {winner}
        </div>
        
      </div>
    );
  }
 
}

export default Finished; 