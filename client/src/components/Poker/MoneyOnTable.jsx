import React from 'react';
import axios from 'axios';

const MoneyOnTable = ({userBet, dealerBet, moneyOnTable, dealerMove}) => {

  return (
    <div>
      <div>mney on table: {moneyOnTable}</div>
      <div>dealer chips  dealerMove: {dealerMove} this turn bet: {dealerBet}$  this round bet: y$</div>
      <div>user chips this turn bet: {userBet}$   this round bet: y$</div>
    </div>
  );
};

export default MoneyOnTable; 