import React, { Component } from 'react';
import axios from 'axios';
//may need to change this into a class component
class FollowButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollow: 'Follow'
    };
  }
  //should create an event handler, so when a user clicks the send friend request

  sendFriendreq(user) {
    console.log(user);
    const {currentUser} = this.props;

    //should send a axios post request
       axios.post('/routes/userDatabase/friends', {
         currentUser: currentUser,
         user: user
       }).then(() => {
         this.setState({
           isFollow: 'Following'
         })
       })
     
    
    
    // axios.put(`/routes/userDatabase/friends/${user.sub}`, {
    //   users: {
    //     status: 'friendRequest'
    //   }
    // });
  }

  removeFriend(user) {
    axios.delete(`/routes/userDatabase/friends/${user.id}`)
      .then(() => {
        this.setState({
          isFollow: 'Follow'
        })
      })
  }

  render() {
    const { isFollow } = this.state;
    const { user } = this.props;
    return (
      <button onClick={() =>  {
        isFollow ===  'Follow' ? this.sendFriendreq(user) : this.removeFriend(user)
      }}>
    {isFollow}
      </button>
    );
  }
}

export default FollowButton;