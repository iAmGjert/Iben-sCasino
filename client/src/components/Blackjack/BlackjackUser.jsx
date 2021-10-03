import React from 'react';
import axios from 'axios';
import image from './pngegg.png'

const BlackjackUser = (props) => {
  //need a mapping function... from the userHand array--> for each need a component <img /> with an src=cardObj.image
  const {userHand} = props;
  // console.log(userHand);

  const hand = userHand.map(cardObj => <img key={cardObj.code} height={100} src={cardObj.image}/>);


  

  return (
    <div>blackjack user
      {hand}
      <img src={image} height={100}/>
    </div>
  );
};

export default BlackjackUser;