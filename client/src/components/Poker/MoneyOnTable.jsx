import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledMoney = styled.div`
  .money {
    display: table-cell;
    border: 3px solid black;
    border-radius: 50%;
    height: 100px;
    width: 100px;
    font-size: 25px;
    color: white;
    background-color: #363321;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 7px auto;
    

  }
  .wrapper {
    display: flex;
    flex-direction: row;
  }
  .m {
    margin: 15px;
    background-color: darkgreen;
    border: 3px solid black;
    border-radius: 3px;
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  p {
    background-color: green;
    border: 2px black solid;
    border-radius: 4px;
    color: white;
    font-size: 15px;
    padding: 20px;
  }
`;



const MoneyOnTable = ({userBet, dealerBet, moneyOnTable, dealerMove, buyIn}) => {

  return (
    <StyledMoney>
      <div className='wrapper'>
        <div className='m'><p>Money on table:</p>
          <div className="money">{moneyOnTable}</div>
        </div>
        <div className='m'><p>  Dealer's Move: </p>
          <div className="money">{dealerMove}</div>
        </div>
        <div className='m'><p>dealer bet:</p>
          <div className="money">{dealerBet}$ </div>
        </div>
        
        <div className='m'><p>your bet: </p>
          <div className="money">{userBet}$</div>  
        </div>
        <div className='m'>
          <p> money left: </p>
          <div className="money">{buyIn} </div>
        </div>
      </div>
    </StyledMoney>
  );
};

export default MoneyOnTable; 