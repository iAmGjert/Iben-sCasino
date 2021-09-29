import React, { Component } from 'react';
import axios from 'axios';
import FriendreqButton from './FriendreqButton.jsx';

class AddFriends extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
    }
  }
  

  //Make an axios get request to get the users from the database.
  //*Using routes: /routes/userDatabase/user
  getUsers() {
   axios.get('/routes/userDatabase/user')
   .then(users => {
     console.log(users.data);
     this.setState({
       users: users.data
     })
   })
  }
  
  
componentDidMount() {
  this.getUsers();
}



  
  render() {
    const { users } = this.state;
  return (
    <div className='card-friend'>
  {/* image of the user's email/profile */}
  { users.map( user => (

<div className='user-info'> 
{user.name}    Email: {user.email}
<FriendreqButton  user={user}/>
</div> 

  ))
  }
    </div>
  )
  }
}

export default AddFriends;