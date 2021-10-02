import React, { Component } from 'react';
import axios from 'axios';
//may need to change this into a class component
class FollowButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollow: 'Follow',
      friends: '',
    };
    this.followUser = this.followUser.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
  }
  //should create an event handler, so when a user clicks the send friend request

  followUser(user) {
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
//Where I left off
  // getFriends(){
  //   const { currentUser } = this.props;
  //   // console.log(currentUser);
  //   axios.get(`/routes/userDatabase/friends/${currentUser.id}`)
  //   .then(friend => {
       
  //   })
  // }
  componentDidMount() {
    // this.getFriends();
  }
  render() {
    const { isFollow, friend } = this.state;
    const { user, currentUser } = this.props;
    return (
      <button onClick={() =>  {
        isFollow ===  'Follow' ? this.followUser(user) : this.removeFriend(user)
      }}>
        {isFollow}
    {/* { friend.UserId === currentUser.id ? isFollow === 'Following' : isFollow === 'Follow'} */}
      </button>
    );
  }
}

export default FollowButton;