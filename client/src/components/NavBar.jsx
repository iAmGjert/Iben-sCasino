import React from 'react';
import {Link} from 'react-router-dom';


const NavBar = (props) => {
  
  

  return (
    <div>
      <p>
        <Link to='/blackjack'>Blackjack</Link>
        <Link to='/login'>Login</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/addFriends'>Interacting with Users</Link>
        <Link to='/logout'>Logout</Link>
      </p>
        
        
    </div>
  );
  
};

export default NavBar;