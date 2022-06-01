import React from 'react';
import styled from 'styled-components';
const PFStyles = styled.div`
  .pf {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
  }

  .pf:hover {
    background-color: yellow;
  }

  .pfImage {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }

  .pfName {
    font-weight: 500;
    margin-right: 20px;
  }
  .monies {
    margin-right: 20px;
  }
  .addFriend {
    height: 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: yellow;
    color: green;
  }
`;

const PossibleFriend = ({ user, currentUser }) => {
  const addFriend = () => {
    // send a post request to the server to add a friend to a user;
  };

  return (
    <PFStyles>
      <div className='pf'>
        <img className='pfImage' src={user.picture} />
        <span className='pfName'> {user.name}</span>
        <span className='monies'> Monies: {user.money}</span>
        <button className='addFriend'>Add Friend</button>
      </div>
    </PFStyles>
  );
};

export default PossibleFriend;
