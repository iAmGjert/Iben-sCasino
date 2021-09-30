import React from 'react';
import {Link} from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'anon',
        money: '$--'
      }

    }
  }
  render() {
    return (
      <div>
        <p>
          <Link to='/blackjack'>Blackjack</Link>
          
          <Link to='/login'>Login</Link>
          <Link to='/profile'>Profile</Link>
          <Link to='/addFriends'>Interacting with Users</Link>
        </p>
        
        
      </div>
    );
  }
}

export default NavBar;