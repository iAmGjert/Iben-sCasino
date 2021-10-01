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

    if(this.state.isFollow === 'Following') {
      axios.delete(`/routes/userDatabase/friends/${user.id}`)
      .then(() => {
        this.setState({
          isFollow: 'Follow'
        })
      })
     } else {

       //should send a axios post request
       axios.post('/routes/userDatabase/friends', {
         currentUser: currentUser,
         user: user
       }).then(() => {
         this.setState({
           isFollow: 'Following'
         })
       })
     }
    
    
    // axios.put(`/routes/userDatabase/friends/${user.sub}`, {
    //   users: {
    //     status: 'friendRequest'
    //   }
    // });
  }

  render() {
    const { isFollow } = this.state;
    const { user } = this.props;
    return (
      <button onClick={() => this.sendFriendreq(user)}>
    {isFollow}
      </button>
    );
  }
}

export default FollowButton;