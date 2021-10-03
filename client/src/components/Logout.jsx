import axios from 'axios';
import React from 'react';
import Login from './Login.jsx';
import {Redirect} from 'react-router-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';





const Logout = () => {


  const logout = async () => {
    console.log('hit');
    try {
      await axios.get('/logout');
      
    } catch (err) {
      console.log('logout err', err);
    }
    alert('You are Logged Out!');
    return <Redirect to="/login/" />;
  };
 
  return (
   
    <button onClick={logout} >Logout</button>
    
  );
};

export default Logout;