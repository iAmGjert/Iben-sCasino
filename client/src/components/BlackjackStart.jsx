import React from 'react';

const BlackjackStart = (props) => {
  const {changeRender} = props;
  return (
    <div>
      <button onClick={()=> changeRender('blackjack')}>start game</button>
    </div>
  )
}

export default BlackjackStart;