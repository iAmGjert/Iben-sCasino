import React from 'react';
import axios from 'axios';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'anon',
        money: '$---.--'
      }
    };
  }

  

  async componentDidMount() {
    try {
      console.log('mount');
      const userData = await axios.get('/profile/user');
      const {name, money} = userData.data;
      this.setState({
        user: {
          name: name,
          money: money
        }
      });
    } catch (err) {
      console.log('err', err);
    }
  }

  render() {
    const {name, money} = this.state.user;
    return (
      <div>

        prof headinng
        <p>{name}</p>
        <p>{money}</p>
      </div>
    );
  }
}

export default Wrapper;