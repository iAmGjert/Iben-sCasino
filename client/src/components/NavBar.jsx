import React from 'react';
import {Link} from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p>item
          <Link to='/blackjack'>Blackjack</Link>
          <Link to='/login'>Login</Link>
          <Link to='/profile'>Profile</Link>
        </p>
        <p>item</p>
        
      </div>
    );
  }
}

export default NavBar;