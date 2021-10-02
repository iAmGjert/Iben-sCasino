import React from 'react';
import {Link} from 'react-router-dom';


const NavBar = (props) => {
  
  

  return (
    
    <nav className="red darken-4">
      <div className="nav-wrapper container">
        <div className="row right hide-on-med-and-down">
          <div className="col s2.5"><Link to='/blackjack'>Blackjack</Link></div>
          <div className="col s2.5"><Link to='/login'>Login</Link></div>
          <div className="col s2.5"><Link to='/profile'>Profile</Link></div>
          <div className="col s2.5"><Link to='/addFriends'>Interacting with Users</Link></div>
          <div className="col s2.5"><Link to='/logout'>Logout</Link></div>
        </div>
          
          
          
          
          
      </div>
      
    </nav>
        
    
  );
  
};

export default NavBar;