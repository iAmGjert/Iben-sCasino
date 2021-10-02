import React, { Component } from 'react';
import axios from 'axios';
import FollowButton from './FollowButton.jsx'
import Search from './Search.jsx';
import UserPreview from './UserPreview.jsx';
import FollowingBar from './FollowingBar.jsx';
import {Link} from 'react-router-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
class AddFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentUser: '',
      value: '',
      userSearched: [],
      friends: [],
    };
    this.getUsers = this.getUsers.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.searchUser = this.searchUser.bind(this);
    // this.getFriends = this.getFriends.bind(this);
  
  }
  

  //Make an axios get request to get the users from the database.
  //*Using routes: /routes/userDatabase/user
  getUsers() {
    axios.get('/routes/userDatabase/users')
      .then(users => {
        // console.log(users.data);
        this.setState({
          users: users.data
        });
      });
  }

  getProfile() {
    axios.get('/routes/profile/user')
      .then(user => {
        // console.log('getProfile', user.data);
        this.setState({
          currentUser: user.data
        });
      })
      .catch((err => console.log('getprof err', err)));
  }

//   getFriends() {
    
//     const { currentUser } = this.state;
//   console.log('GetFriendsCurrentUser: ', currentUser);
//    axios.get(`/routes/userDatabase/friends/${currentUser.id}`)
//    .then(data => {
//      console.log(data);
//      // // this.setState({
//      //   friends: friend,
//      // })
//    })
//  }

  //event handler for search bar to update the input value
  changeInput(name) {
    this.setState({
       value: name
    })
  }
  
  //event handler to search for the given input value and get back the user that matches the input val.
  searchUser(user) {
      return axios.get(`/routes/userDatabase/${user}`)
      .then(user => {
        this.setState({
          userSearched: user.data
        })
      })
  }
  
  
  
  componentDidMount() {
    
        this.getUsers();
        this.getProfile();
        // this.getFriends();
        // this.searchUser();
        //  console.log('componentDidMont:', this.state)
    
  }



  
  render() {
    const { users, currentUser, value, userSearched, friends } = this.state;
    // console.log('ADDFRIENDS:', this.state)
    return (
      
      <div className='currentFriend'>
        <Link  to='/Leaderboard'>Black Jack Leaderboard </Link>
        <h1>Active Player: {currentUser.name}</h1>
      
        <h3>Recent Players</h3>
        { users.map( (user, i) => (

          <div className='user-info' key={i}> 
        <img src={user.picture} />  {user.name}    Email: {user.email}
            <FollowButton user={user} currentUser={currentUser}
            key={i} />
          </div> 

        ))
        }
        <div>
          <Search changeInput={this.changeInput} searchUser={this.searchUser} value={value}/>
          <UserPreview  userSearched={userSearched}   />
        </div>
        <FollowingBar friends={friends} />
      </div>
    );
  }
}

export default AddFriends;