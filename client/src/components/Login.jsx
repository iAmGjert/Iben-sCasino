import React from 'react';
import axios from 'axios';
const {clientId} = require('../../../config.js');

//import { CLIENT_ID } from '../../../config';
import { GoogleLogin } from 'react-google-login';


// const handleLogin = () => {
//   axios.get('/google/callback').then(() => {
//     console.log("login");
//   }).catch((err) => {
//     console.log('Error handleLogin:', err)
//   })
// }

const responseGoogle = (response) => {
  // CORS issue -> using entire url  --> need to use local host?
  axios.get('http://localhost:1337/google')
    .then((response) => {
      console.log('response success:', response);
    })
    .catch((err) => {
      console.log('response error:', err);
    });
};


const Login = (props) => {
  //logic for google passport etc.
  const {changeRender} = props;
  return (
    <div>login goes here
      
      <GoogleLogin
        clientId={ clientId.CLIENT_ID } // --> move to backend require it in.
        buttonText="Log in with Google"
        onSuccess={responseGoogle}
        //onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />

    
     
      <button onClick={()=> changeRender('blackjack')}>test changeRender to blackjack</button>
    </div>
  );
};

export default Login;