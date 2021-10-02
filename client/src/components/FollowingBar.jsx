import React, {Component} from "react";
import axios from "axios";
import UnfollowButton from "./UnfollowButton.jsx";
class FollowingBar extends Component  {
 constructor(props){
   super(props);
   this.state = {
     currentUser: '',
       friends: [],
       players: [],
   };
  //  this.getFriends = this.getFriends.bind(this)
   this.getProfile = this.getProfile.bind(this);
 }

 getProfile() {
  axios.get('/routes/profile/user')
    .then(user => {
      console.log('getProfile', user.data);
      this.setState({
        currentUser: user.data
      });
    })
    .then(() => {
      axios.get(`/routes/userDatabase/friends/${this.state.currentUser.id}`)
 .then(friends => {
  //  console.log(friends);
   this.setState({
     friends: friends.data,
   })
 })
    })
    .catch((err => console.log('getprof err', err)));
}

getPlayers() {
  axios.get('/routes/userDatabase/users/leaderboard')
  .then(players => {
    // console.log(players)
    this.setState({
      players: players.data
    })
  })
 }
// getFriends() {
//   const { currentUser } = this.state;
// console.log('GetFriendsCurrentUser: ', currentUser);
// //  axios.get(`/routes/userDatabase/friends/${currentUser.id}`)
// //  .then(data => {
// //    console.log(data);
// //    // // this.setState({
// //    //   friends: friend,
// //    // })
// //  })
// }
componentDidMount(){
  this.getProfile();
  this.getPlayers();
  // this.getFriends();
  // console.log('FLAG:!!',this.props);
}
  render(){

    // const SidebarData = [
    //   {
    //     picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvHH4XQ0CG0o5Msww62eqifaQ43TIxnBe3FQ&usqp=CAU',
    //     userName: 'Maason Smith'
    //   },
    // {
    //      picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvHH4XQ0CG0o5Msww62eqifaQ43TIxnBe3FQ&usqp=CAU',
    //      userName: 'Maason Smith'
    //    },
    //  ]
      const { friends, players } = this.state;
      console.log(players);
    return (
      <div className='following-bar' style={{height: '200%',width: '300px', backgroundColor: "#2F4050", marginTop: '20%'}}>
        <ul className="list-bar" style={{height: 'auto', padding: '0', width: '100%'}}>
        <h5 className='following-header'>Following </h5>
      {friends.map((val, key) => {
          return players.map(player => {

             if(val.friends === player.name) {
   
               return (
                 <li key={key} className='row' style={{height: '60px', width: '100%', listStyleType: 'none', margin: '0%', display: 'flex', flexDirection: 'row', color: 'white', fontFamily: 'trebuchet ms, Lucida Sans Unicode, Lucida Grande, Lucida Sans, Ariel, sans-serif ', }}> 
             
                 <img src={player.picture} style={{height: '66', width: '66px', flex: '30%', display: 'grid', placeItems: 'center', borderRadius: '50%', backgroundSize: 'cover', boxShadow: 'black 10px 10px 10px'}} /> 
                 <div style={{flex: '70%'}}>{val.friends} <UnfollowButton user={player}/></div> 
                 <div style={{flex: '70%'}}>Total Money: ${player.money}</div>
                 </li>
               )
             }
           })
      })}
      </ul>
      </div>
    )
}
}

export default FollowingBar;