import React from 'react';
import axios from 'axios';

//displays users cards
const BlackjackUser = (props) => {

  const {userHand} = props;


  const hand = userHand.map(cardObj => <img key={cardObj.code} height={170} src={cardObj.image}/>);


  

  return (
    <div>
      
      {hand}
 
    </div>
  );
};

export default BlackjackUser;