import React from 'react';

class Finished extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() { //here call the get winner method from Poker.jsx
    try {
      await this.props.updateMoneyOnTable();
      await this.props.findWinner();
      await this.props.updateResults();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div> 
        <h2>Game Over</h2>
        <h3>winner: {this.props.winner}</h3>
        <h3>takeHome: {this.props.takeHome}</h3>
          
        
      </div>
    );
  }
 
}

export default Finished;