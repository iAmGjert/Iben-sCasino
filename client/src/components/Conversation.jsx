import React from 'react';
import styled from 'styled-components';

const ConversationStyles = styled.div`
  .conversation {
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
  }

  .conversation:hover {
    background-color: yellow;
  }

  .conversationImage {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }

  .conversationName {
    font-weight: 500;
  }
`;
const Conversation = ({ user }) => {
  return (
    <ConversationStyles>
      <div className='conversation'>
        <img className='conversationImage' src={user.picture} />
        <span className='conversationName'>{user.name}</span>
      </div>
    </ConversationStyles>
  );
};

export default Conversation;
