import React from 'react';

const UserCards = ({userHand}) => {
  return (
    <div>user cards
      {userHand.map((card, i) => <img src={card.image} key={i} height={100}/>)}
    </div>
  );
};

export default UserCards;