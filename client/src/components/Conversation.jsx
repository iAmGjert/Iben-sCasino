import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
const Conversation = ({
  user,
  currentUser,
  setCurrentConversation,
  setRecipient,
}) => {
  const handleClick = async () => {
    const res = await axios.get('/routes/conversation', {
      params: {
        senderId: currentUser.id,
        receiverId: user.id,
      },
    });
    setRecipient(user);
    setCurrentConversation(res.data.conversationId);
  };

  return (
    <ConversationStyles>
      <div className='conversation' onClick={handleClick}>
        <img className='conversationImage' src={user.picture} />
        <span className='conversationName'>{user.name}</span>
      </div>
    </ConversationStyles>
  );
};

export default Conversation;
