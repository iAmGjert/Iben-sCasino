import React from 'react';

const UserCards = ({userHand}) => {
  return (
    <div>
      <h4>User Cards</h4>
      {userHand.map((card, i) => <img src={card.image} key={i} height={170}/>)}
    </div>
  );
};

export default UserCards;