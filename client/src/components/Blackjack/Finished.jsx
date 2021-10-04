import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FinishedStyles = styled.div`
  .buttons {
    height: 30px;
    width: 100px;
    background-color: purple;
    color: gold;
    border: gold solid 1px;
    border-radius: 3px;
      :hover {
        background-color: lavender;
      }
  }
`;

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
      <FinishedStyles>
        
        <h3>{outcome}</h3>
        <div>
          <h4>User: {userScore} dealer: {dealerScore}</h4>
          <h3>winner: {winner}</h3>
        </div>
        <div>
          <button 
            className="buttons"
            onClick={()=>{
              this.props.changeRender('start');
            }}
          >new game</button>
        </div>
        
      </FinishedStyles>
    );
  }
 
}

export default Finished; 