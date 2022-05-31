import React from 'react';
import axios from 'axios';

const Rewards = ({ user }) => {

  // updateUser = () => {
  //   axios.put(`/routes/userDatabase/users/${this.state.user[0][0]}`, {
  //     users: {
  //       money: this.state.user[0][5] + 200
  //     }
  //   })
  //   .then(() => {
  //     console.log('put worked');
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   })
  // }



  return (
    <h1>
      <div>{console.log(user[0][5])}</div>
    </h1>
  )
}


export default Rewards;
