import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NavBar = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    axios.get('/routes/profile/user')
      .then(( data )=>{
        if (data.status === 201) {
          setUser(data.data);
          setIsLoggedIn(true);
          return data.data;
        }
      });  
  }, []);
  return (
    <nav
      style={{ borderStyle: 'dashed', borderColor: 'gold', borderWidth: '2px' }}
      className='deep-purple'
    >
      <div
        style={{ textShadow: '0px 0px 5px #fff, 1px 1px 2px black' }}
        className='nav-wrapper container'
      >
        <div className='row'>
          <div className='col s1.5'>
            <Link to={user ? '/blackjack' : '/login'}>Blackjack</Link>
          </div>
          <div className='col s1.5'>
            <Link to='/login'>Login</Link>
          </div>
          <div className='col s1.5'>
            <Link to={user ? '/profile' : '/login'}>Profile</Link>
          </div>
          <div className='col s1.5'>
            <Link to={user ? '/social' : '/login'}>Social</Link>
          </div>
          <div className='col s1.5'>
            <Link to={user ? '/addFriends' : '/login'}>Interacting with Players</Link>
          </div>
          <div className='col s1.5'>
            <Link to={user ? '/poker' : '/login'}>Poker</Link>
          </div>
          <div className='col s1.5'>
            <Link to={user ? '/logout' : '/login'}>Logout</Link>
          </div>
          <div className='col s1.5'>
            <Link to={user ? '/roulette' : '/login'}>Roulette</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
