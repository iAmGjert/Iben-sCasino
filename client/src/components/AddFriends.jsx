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
    this.addFriend = this.addFriend.bind(this);
  
  }
  

  //Make an axios get request to get the users from the database.
  //*Using routes: /routes/userDatabase/user
  getUsers() {
    axios.get('/routes/userDatabase/users')
      .then(users => {
        this.setState({
          users: users.data
        });
      });
  }

  getProfile() {
    axios.get('/routes/profile/user')
      .then(user => {
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
  
  addFriend(friend) {
    const {friends} = this.state;
    // console.log('add friend click, friend, friends', friend, friends);
    const newFriends = [...friends];
    if(newFriends.includes(friend)){
       newFriends.splice(1);
    } else {

      newFriends.push(friend);
    }
    this.setState({
      friends: newFriends
    });
  }
  
  
  componentDidMount() {
    
        this.getUsers();
        this.getProfile();
    
  }


 
  
  render() {
    const { users, currentUser, value, userSearched, friends } = this.state;
    // console.log('ADDFRIENDS:', this.state)
     const style = {
      position: 'absolute', 
      right: '30px',
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'white',
      textShadow: '2px 2px 4px #000000'
     }

     const styleRecent = { 
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'white',
      textShadow: '2px 2px 4px #000000',
      position: 'relative',
      left: '100px'
     }
     const imageStyle = {
      border: '3px solid #ddd',
      borderRadius: '50%',
      padding: '5px',
      width: '80px',
      height: '80px',
     }

     const infoStyle = {
      position: 'relative',
      left: '100px'
     }
     const textStyle = {
       fontFamily: 'Merriweather Sans, sans-serif',
       fontSize: '20px',
       color: 'black',
      padding: '10px',
      fontWeight: '900',
      }
    return (
      
      <div className='currentFriend'>
        
         <Link  to='/Leaderboard'> <a className="waves-effect purple btn">Black Jack Leaderboard </a></Link>
        
        <h1 className='active-player' style={style}><i className="material-icons" style={{color: 'white', fontSize: '30px'}}>account_circle</i>Active Player: {currentUser.name}</h1> 
        
          
        
        <h3 className='recent-players' style={styleRecent}>Recent Players</h3>
         
        <ul className="collection" style={{backgroundColor: 'white', width: '600px', border: '3px solid'}}>
        { users.map( (user, i) => (
          <li class="collection-item avatar">
            <img src={user.picture} alt="" className="circle" style={imageStyle}  /> 
          <div className='user-info' key={i} style={infoStyle}> 
        
        <span className="title" style={textStyle}>{user.name}</span>   
        <p style={textStyle}>Email: {user.email} <br />
        </p>
        <FollowButton user={user} currentUser={currentUser} addFriend={this.addFriend}
            key={i} />
           
          </div> 
          
          </li>
        ))
        }
        
       </ul>
         <Search changeInput={this.changeInput} searchUser={this.searchUser} value={value} />
          <UserPreview  userSearched={userSearched} addFriend={this.addFriend} />
          <FollowingBar latestFriends={friends}/>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </div>
    );
  }
}

export default AddFriends;