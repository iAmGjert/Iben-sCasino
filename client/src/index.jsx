import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game.jsx';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import AddFriends from './components/AddFriends.jsx';
import NavBar from './components/NavBar.jsx';
import Wrapper from './components/Wrapper.jsx';
import UserContext from './contexts/UserContext.jsx';
import PokerGame from './components/PokerGame.jsx';
import Logout from './components/Logout.jsx';



ReactDOM.render(
  <Router>
    <div>
      
    

      <main>
        <UserContext.Provider>
          <Wrapper />
        </UserContext.Provider>
        
        <Route exact path='/profile' component={Profile} />
        
        <NavBar />
        <Route exact path='/poker' component={PokerGame} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/blackjack' component={Game} />
        <Route exact path='/logout' component={Logout} />
        
        <Route exact path='/addFriends' component={AddFriends} />
      </main>
    </div>
  </Router>,
  document.getElementById('app')
);



