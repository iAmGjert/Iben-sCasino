import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game.jsx';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import AddFriends from './components/AddFriends.jsx';
import NavBar from './components/NavBar.jsx';
import Logout from './components/Logout.jsx';
import Wrapper from './components/Wrapper.jsx';
import UserContext from './contexts/UserContext.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import PokerGame from './components/PokerGame.jsx';
import Social from './Pages/Social.jsx';
import RewardsPage from './components/RewardsPage.jsx';

ReactDOM.render(
  <Router>
    <NavBar />
    <Route exact path='/poker' component={PokerGame} />
    <Route exact path='/profile' component={Profile} />
    <Route exact path='/logout' component={Logout} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/blackjack' component={Game} />
    <Route exact path='/addFriends' component={AddFriends} />
    <Route exact path='/Leaderboard' component={Leaderboard} />
    <Route exact path='/social' component={Social} />
    <Route exact path='/rewards' component={RewardsPage} />
  </Router>,
  document.getElementById('app')
);

/*<UserContext.Provider>
<Wrapper />
</UserContext.Provider>
<PrivateRoute path='/blackjack' component={MyComponent} /> 
*/
