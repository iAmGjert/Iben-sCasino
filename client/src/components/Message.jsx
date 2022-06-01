import React from 'react';
import styled from 'styled-components';

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

const Message = ({ own }) => {
  return (
    <MessageStyles>
      <div className={own ? 'message own' : 'message'}>
        <div className='messageTop'>
          <img
            className='messageImg'
            src='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F20%2F2021%2F09%2F04%2FBeyonce-1.jpg'
            alt=''
          />
          <p className='messageText'>Hello this is a message</p>
        </div>
        <div className='messageBottom'>1 hour ago</div>
      </div>
    </MessageStyles>
  );
};

export default Message;
