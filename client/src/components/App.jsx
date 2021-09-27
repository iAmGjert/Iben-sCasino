import React from 'react';
import Blackjack from './Blackjack.jsx';
import Login from './Login.jsx';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'login'
    };
    this.renderView = this.conditionalRender.bind(this);
    this.changeView = this.changeRender.bind(this);
  }

  //function to change the view so render will render conditionally

  changeRender(view) {
    this.setState({
      view: view
    });
  }

  //make a conditional render here.

  conditionalRender() {
    const {view} = this.state;

    if(view === 'blackjack') {
      return <Blackjack />;
    }
    if(view === 'login') {
      return <Login changeRender={this.changeView} />;
    }

  }



  render() {
    return (
      <div>
        {this.conditionalRender()}
      </div>
    )
  }

 
} 


export default App;