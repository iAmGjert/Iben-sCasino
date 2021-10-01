import axios from 'axios';
import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';



const Logout = () => {
  const logout = async () => {
    try {
      await axios.get('/logout');
      console.log('looged out');
    } catch (err) {
      console.log('logout err', err);
    }
  };
  return (
    <button>Logout</button>
  );
};

export default Logout;