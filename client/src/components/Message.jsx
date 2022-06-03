import React from 'react';
import styled from 'styled-components';
import { format } from 'timeago.js';

const MessageStyles = styled.div`
  .message {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }
  .messageImg {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }
  .messageText {
    color: white;
    margin: 0;
    border-radius: 20px;
    background-color: purple;
    padding: 10px;
    max-width: 300px;
  }
  .messageTop {
    display: flex;
  }
  .messageBottom {
    font-size: 12px;
    margin-top 10px;
  }
  .message.own{
    align-items: flex-end;
  }
  .message.own .messageText{
    background-color: #FFD700;
    color: green;
  }
`;

const Message = ({ own, message, recipient, currentUser }) => {
  return (
    <MessageStyles>
      <div className={own ? 'message own' : 'message'}>
        <div className='messageTop'>
          {console.log(recipient)}
          {/* Image needs to change based on owner */}
          {own ? (
            <img className='messageImg' src={currentUser.picture} alt='' />
          ) : (
            <img className='messageImg' src={recipient.picture} alt='' />
          )}
          <p className='messageText'>{message.text}</p>
        </div>
        <div className='messageBottom'>{format(message.createdAt)}</div>
      </div>
    </MessageStyles>
  );
};

export default Message;
