import React, {Component} from 'react';
import axios from 'axios';
import UnfollowButton from './UnfollowButton.jsx';
class FollowingBar extends Component {
  constructor(props) {
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
      // console.log('getProfile', user.data);
        this.setState({
          currentUser: user.data
        });
      })
      .then(() => {
        axios.get(`/routes/userDatabase/friends/${this.state.currentUser.id}`)
          .then(friends => {
            //console.log(friends);
            this.setState({
              friends: friends.data,
            });
          });
      })
      .catch((err => console.log('getprof err', err)));
  }

  getPlayers() {
    axios.get('/routes/userDatabase/users/leaderboard')
      .then(players => {
        // console.log(players)
        this.setState({
          players: players.data
        });
      });
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
  componentDidMount() {
    this.getProfile();
    this.getPlayers();
  // this.getFriends();
  }
  render() {

    // const { friends, players } = this.state;
    const {latestFriends} = this.props;
    const stylesHeader = {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'white',
      textShadow: '2px 2px 4px #000000'
    };
    //console.log(latestFriends);
    return (
      <div className='following-bar' style={{height: '300px', width: '300px', backgroundColor: '#2F4050', marginTop: '255px'}}>
        <ul className="list-bar" style={{height: 'auto', padding: '0', width: '100%'}}>
          <h5 className='following-header' style={stylesHeader}>Following {latestFriends.length} </h5>
          {latestFriends.map((friend, key) => {
            // return <div key={key}>Hello </div>
            return (
              <li key={key} className='row' style={{height: '60px', width: '100%', listStyleType: 'none', margin: '0%', display: 'flex', flexDirection: 'row', color: 'white', fontFamily: 'trebuchet ms, Lucida Sans Unicode, Lucida Grande, Lucida Sans, Ariel, sans-serif ', }}> 
      
                <img src={friend.picture} style={{height: '66', width: '66px', flex: '30%', display: 'grid', placeItems: 'center', borderRadius: '50%', backgroundSize: 'cover', boxShadow: 'black 10px 10px 10px'}} /> 
                <div style={{flex: '70%'}}>{friend.name} <UnfollowButton user={friend}/></div> 
                <div style={{flex: '70%'}}>Total Money: ${friend.money}</div>
          
              </li>

          
            );
          
          })}
      
        </ul>
      </div>
    );
  }
}

export default FollowingBar;