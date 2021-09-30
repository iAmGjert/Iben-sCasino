import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import axios from 'axios';

class Profile extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: 'name'
    };
    this.getUser = this.getUser.bind(this);
  }


  async getUser() {
    const data = await axios.get('/routes/profile/user');
    return data.data;
   
      
  }
  async componentDidMount() {
    const newName = await this.getUser();
    this.setState({
      name: newName
    });
    
  }

  render() {
    return (
      <div>profile component
        <h1>{this.state.name}</h1>
        <button onClick={this.getUser}>get user</button>
      </div>
    );
  }

}

export default Profile;