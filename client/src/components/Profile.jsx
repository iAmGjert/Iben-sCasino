import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import Rewards from './Rewards.jsx';
import ThemeContext, { themes } from '../theme-context';

class Profile extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      theme: themes.light
    };
    this.getUser = this.getUser.bind(this);
  }

  async getUser() {
    const data = await axios.get('/routes/profile/user'); 
    
    return data.data;
   
      
  }
  async componentDidMount() {
    const userData = await this.getUser(); 
    
    this.setState({
      user: [Object.values(userData)],
      theme: userData.theme === null ? themes.light 
      : userData.theme === 'light' ? themes.light 
      : userData.theme === 'dark' ? themes.dark 
      : themes.light
    });
  }



  render() {
    const style = {
      backgroundColor: '#35654d',
      padding: '10px',
      textShadow: '0px 0px 4px #fff, 1px 1px 2px black, 0px 0px 1px red',
      textAlign: 'center',
      fontWeight: '900',
      
      
    };
    const border = {
      borderWidth: '5px',
      borderStyle: 'dotted',
      paddingLeft: '15px',
      marginRight: '80px',
      marginLeft: '80px',
      borderShadow: '4px',
      boxShadow: '3px 3px 3px',
      textAlign: 'center'
      
    };

    //map over user profile from database and render to profile page
    return (
      
      <div style={this.state.theme}>
        <div className='card-panel green darken-2' style={border}><h1>Player's Room</h1></div>
        
        {
          this.state.user.map((info, i) => {
            return (
              <div key={i}>

                {/* <div>
                {
                  info[5] >= 10200 ? <button onClick={this.toggleTheme}>Change Theme</button> : ''
                }        
                </div> */}

                <div className='row' style={{textAlign: 'center'}}>
                  <h5 style={{textAlign: 'right'}}>${info[5]}</h5>
                  <h2>Welcome back, {info[2]}! <img className='circle responsive-img z-depth-4' src={info[3]} style={{width: 60}} /></h2>
                </div>
                <div><Rewards user={info} /></div>
                <h4 style={{textAlign: 'center'}}>Baller Status: {info[5] > 75 ? 'Baller' : info[5] <= 75 && info[5] >= 35 ? 'Bum' : 'Broke!!!'}</h4>
              </div>
            );
          })
        }
      </div>
    );
  }

}

export default Profile;