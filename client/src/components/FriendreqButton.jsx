import React, { Component } from 'react';
import axios from 'axios';
//may need to change this into a class component
class FriendreqButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }
  //should create an event handler, so when a user clicks the send friend request

  sendFriendreq(user) {
    const {currentUser} = this.props;
    //should send a axios post request
    axios.post('/routes/userDatabase/friends', {
      currentUser: currentUser,
      user: user
    })
    // axios.put(`/routes/userDatabase/friends/${user.sub}`, {
    //   users: {
    //     status: 'friendRequest'
    //   }
    // });
  }

  render() {
    const { user } = this.props;
    return (
      <button onClick={() => this.sendFriendreq(user)}>
     Send Friend Request
      </button>
    );
  }
}

export default FriendreqButton;