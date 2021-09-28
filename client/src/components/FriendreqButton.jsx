import React, { Component } from 'react';

//may need to change this into a class component
class FriendreqButton extends Component {
constructor(props){
super(props);
this.state = {
  
}
}
  //should create an event handler, so when a user clicks the send friend request

  sendFriendreq(userId) {
    //should send a axios post request
  }

  render() {
  return (
    <button onClick={() => this.sendFriendreq()}>
     Send Friend Request
    </button>
  )
  }
}

export default FriendreqButton;