import React from 'react';

class Finished extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { //here call the get winner method from Poker.jsx
    this.props.findWinner();

  }

  render() {
    return (
      <div> game over.  winner: {this.props.winner.data}</div>
    );
  }
 
}

export default Finished;