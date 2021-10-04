import React, {Component} from 'react';
import axios from 'axios';
class UnfollowButton extends Component {
constructor(props){
  super(props);
  this.state = {
    isFollow: 'Following',
  }
  this.followUser = this.followUser.bind(this);
    this.removeFriend = this.removeFriend.bind(this);
}

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


  render() {
    const { isFollow } = this.state;
    const { user } = this.props;
    return (
      <a className="waves-effect purple btn" onClick={() =>  {
        isFollow ===  'Following' ? this.removeFriend(user) : this.followUser(user)
      }}>
        {isFollow}
      </a>
    )
  }
}
export default UnfollowButton;