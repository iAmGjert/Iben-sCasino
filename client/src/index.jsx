import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import Login from './components/Login.jsx';



ReactDOM.render(
  <Router>
    <div>
      <aside>
        <Link to='/blackjack'>Blackjack</Link>
        <Link to='/login'>Login</Link>
      </aside>

      <main>
        <Route exact path='/login' component={Login} />
        <Route exact path='/blackjack' component={App} />
      </main>
    </div>
  </Router>,
  document.getElementById('app')
);
//ReactDOM.render(<App/>, document.getElementById('app'));


