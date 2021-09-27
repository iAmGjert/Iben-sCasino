import React from 'react';

const Login = (props) => {
  //logic for google passport etc.
  const {changeRender} = props
  return (
    <div>login goes here
      <button onClick={()=>{
        console.log('click')
        changeRender('blackjack')
      }}>test changeRender to blackjack</button>
    </div>
  )
}

export default Login;