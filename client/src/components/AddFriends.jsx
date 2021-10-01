import React, { Component } from 'react';
import axios from 'axios';
import FriendreqButton from './FriendreqButton.jsx';

class AddFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentUser: ''
    };
    this.getUsers = this.getUsers.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }
  

  //Make an axios get request to get the users from the database.
  //*Using routes: /routes/userDatabase/user
  getUsers() {
    axios.get('/routes/userDatabase/user')
      .then(users => {
        console.log(users.data);
        this.setState({
          users: users.data
        });
      });
  }

  getProfile() {
    axios.get('/routes/profile/user')
      .then(user => {
        console.log(user);
        this.setState({
          currentUser: user.data
        });
      })
      .catch((err => console.log('getprof err', err)));
  }
  
  
  componentDidMount() {

    this.getUsers();
    this.getProfile();
  }



  
  render() {
    const { users, currentUser } = this.state;
    return (
      <div className='currentFriend'>
        <h1>currentUser: {this.state.currentUser.name}</h1>
        {/* image of the user's email/profile */}
        { users.map( (user, i) => (

          <div className='user-info' key={i}> 
            {user.name}    Email: {user.email}
            <FriendreqButton user={user} currentUser={currentUser} key={i} getUsers={this.getUsers}/>
          </div> 

        ))
        }
        <div>
          <h3>place search component here</h3>
          
        </div>
      </div>
    );
  }
}

export default AddFriends;