import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game.jsx';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';



ReactDOM.render(
  <Router>
    <div>
      <aside>
        <Link to='/blackjack'>Blackjack</Link>
        <Link to='/login'>Login</Link>
        <Link to='/profile'>Profile</Link>

      </aside>

      <main>
        <Route exact path='/login' component={Login} />
        <Route exact path='/blackjack' component={Game} />
        <Route exact path='/profile' component={Profile} />
      </main>
    </div>
  </Router>,
  document.getElementById('app')
);



