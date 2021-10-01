import React, { Component } from 'react';
import axios from 'axios';
import FollowButton from './FollowButton.jsx'
import Search from './Search.jsx';
import UserPreview from './UserPreview.jsx';
class AddFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentUser: '',
      value: '',
      userSearched: [],
    };
    this.getUsers = this.getUsers.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.searchUser = this.searchUser.bind(this);
  
  }
  

  //Make an axios get request to get the users from the database.
  //*Using routes: /routes/userDatabase/user
  getUsers() {
    axios.get('/routes/userDatabase/users')
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
    // this.searchUser();
  }



  
  render() {
    const { users, currentUser, value, userSearched } = this.state;
    return (
      <div className='currentFriend'>
        <h1>currentUser: {this.state.currentUser.name}</h1>
        {/* image of the user's email/profile */}
        { users.map( (user, i) => (

          <div className='user-info' key={i}> 
            {user.name}    Email: {user.email}
            <FollowButton user={user} currentUser={currentUser} key={i} />
          </div> 

        ))
        }
        <div>
          <Search changeInput={this.changeInput} searchUser={this.searchUser} value={value}/>
          
          <UserPreview  userSearched={userSearched}   />
          
        </div>
      </div>
    );
  }
}

export default AddFriends;