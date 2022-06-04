import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Rewards = ({ user }) => {

  const [rewardClaimed, setRewardClaimed] = useState(false);


  const updateUser = () => {
    axios.put(`/routes/userDatabase/users/${user[0]}`, {
      users: {
        money: user[5] + 200
      }
    })
      .then(() => {
        setRewardClaimed(true);
        //console.log('put worked');
      })
      .catch((err) => {
        console.error(err);
      });
  };


  return (
    <h3>

      <div style={{textAlign: 'center'}}>
        {
          user[5] === 1400 ? <Link to='/rewards'><button style={{fontSize: '35px', lineHeight: '35px'}}>New Reward!</button></Link> 
            : user[5] === 1800 ? <Link to='/rewards'><button style={{fontSize: '35px', lineHeight: '35px'}}>New Reward!</button></Link> : ''
        }
      </div>
        
      <div>As a thank you for returning, here is $200!</div>

      <div>
        {
          rewardClaimed ? <button style={{fontSize: '25px', lineHeight: '25px'}}>Reward Claimed</button> 
            : <button style={{fontSize: '25px', lineHeight: '25px'}} onClick={updateUser}>Claim $200</button>
        }
      </div>

      <div>
        {
          user[5] > 1400 ? <Link to='/rewards'><button style={{fontSize: '13px', lineHeight: '13px'}}>See Earned Rewards</button></Link> : ''
        }
      </div>

    </h3>
  );
};


export default Rewards;
