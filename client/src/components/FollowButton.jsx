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
    
  //   axios.get(`/routes/userDatabase/friends/${currentUser.id}`)
  //   .then(friends => {
  //     this.setState({
  //       friends: friends.data
  //     })
  //   })
  // }
  componentDidMount() {
  //   this.getFriends();
  }
  render() {
    const { isFollow, friend } = this.state;
    const { user, currentUser } = this.props;

    return (

     <a className="waves-effect purple btn" onClick={() =>  {
        this.props.addFriend(user);
        isFollow ===  'Follow' ? this.followUser(user) : this.removeFriend(user)
      }}> 
        {isFollow}
    {/* { friend.UserId === currentUser.id ? isFollow === 'Following' : isFollow === 'Follow'} */}
       </a>
    );
  }
}

export default FollowButton;