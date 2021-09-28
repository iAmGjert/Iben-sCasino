import React from 'react';
import axios from 'axios';
//const {clientId} = require('../../../config.js');
//import { CLIENT_ID } from '../../../config';
//console.log('client:', CLIENT_ID)
//import { CLIENT_ID } from 'config';
import { GoogleLogin } from 'react-google-login';
//const passport = require ('passport');

// const handleLogin = () => {
//   axios.get('/google/callback').then(() => {
//     console.log("login");
//   }).catch((err) => {
//     console.log('Error handleLogin:', err)
//   })
// }

const responseGoogle = () => {
 // CORS issue -> using entire url  --> need to use local host?
  axios.get('/google')
  
    .then(() => {
      console.log('response success:');
    })
    .catch((err) => {
      console.log('response error:', err);
    });
};


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      display: false,
      clientId: ''
    };
  }

  componentDidMount() {
    console.log('dm');
    axios.get('/routes/clientId')
      .then(data => {
        console.log('data', data);
        const {CLIENT_ID} = data.data.parsed; //pull out the ID 
        this.setState({
          clientId: CLIENT_ID,
          display: true
        });
      });
  }
  render() {
    const {changeRender} = this.props;
    let GoogleDisplay;
    if (this.state.display) {
      GoogleDisplay = <GoogleLogin
        clientId= {this.state.clientId} // --> move to backend require it in.
        buttonText="Log in with Google"
        onSuccess={responseGoogle}
        //onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />;
    } else {
      GoogleDisplay = <div>google display</div>;
    }
    return (
      <div>login goes here
        {GoogleDisplay}
        <button onClick={()=> changeRender('blackjack')}>test changeRender to blackjack</button>
      </div>
    );
  }
  //logic for google passport etc.
  
}
export default Login;