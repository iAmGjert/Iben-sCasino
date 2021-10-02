import React from 'react';
import 'core-js/stable'; //core-js and regenerator-runtime get rid of errors related to using async/await in react
import 'regenerator-runtime/runtime';
import axios from 'axios';

const MoneyOnTable = ({userBet, dealerBet, moneyOnTable}) => {

  return (
    <div>
      <p>dealer chips   this turn bet: {dealerBet}$  this round bet: y$</p>
      <p>user chips this turn bet: {userBet}$   this round bet: y$</p>
    </div>
  );
};

export default MoneyOnTable; 