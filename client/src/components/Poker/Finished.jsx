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
        game over.  winner: {this.props.winner} takeHome: {this.props.takeHome}
        
      </div>
    );
  }
 
}

export default Finished;