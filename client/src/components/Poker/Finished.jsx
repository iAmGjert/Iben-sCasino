import React from 'react';

class Finished extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() { //here call the get winner method from Poker.jsx
    try {
      await this.props.updateMoneyOnTable();
      this.props.findWinner();
    } catch (err) {
      console.log(err);
    }
    

  }

  render() {
    return (
      <div> game over.  winner: {this.props.winner}</div>
    );
  }
 
}

export default Finished;