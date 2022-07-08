/* eslint-disable indent */
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Conversation from '../components/Conversation.jsx';
import PossibleFriend from '../components/PossibleFriend.jsx';
import Match from '../components/Match.jsx';
import Message from '../components/Message.jsx';
import { themes } from '../theme-context.js';
import { io } from 'socket.io-client';

const SocialStyles = styled.div`
  html,
  body {
    padding: 0;
    margin: 0;
    height: 100%;
  }
  .social {
    display: flex;
    width: 100%;
    height: calc(100vh - 90px);
  }

  .friends {
    flex: 3.5;
    display: flex;
    flex-flow: column;
    height: 100%;
  }
  .messages {
    flex: 5.5;
  }
  .matches {
    flex: 3;
  }

  .messagesWrapper,
  .matchesWrapper {
    padding: 10px;
    height: 100%;
  }
  .matchesWrapper {
    overflow-y: auto;
    border: 2px solid black;
  }

  .messagesWrapper {
    display: flex;
    flex-direction: column;
    border: 2px solid black;
  }
  .messagesTop {
    overflow-y: auto;
    height: 70%;
    padding-right: 10px;
  }
  .friendsListWrapper {
    position: relative;
    padding: 10px;
    height: 50%;
    overflow-y: auto;
    border: 2px solid black;
  }
  .addFriendsWrapper {
    position: relative;
    padding: 10px;
    flex: 1 1 auto;
    overflow-y: auto;
    border: 2px solid black;
  }
  .messagesBottom {
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .messagesInput {
    height: 90px;
    padding: 10px;
    resize: none;
  }
  .messagesSubmit {
    height: 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: yellow;
    color: green;
  }
`;

const Social = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [matches, setMatches] = useState(null);
  const [messages, setMessages] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [friends, setFriends] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [socket, setSocket] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [theme, setTheme] = useState(themes.light);
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    // this should be localhost instead of ec2 instance
    socket.current = io(
      'ws://ec2-54-202-187-31.us-west-2.compute.amazonaws.com:8900',
      { transports: ['websocket'] }
    );
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        receiverId: data.receiverId,
        text: data.text,
        conversationId: data.conversationId,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (
      arrivalMessage &&
      currentConversation === arrivalMessage.conversationId
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    socket.current.emit('addUser', currentUser?.id);
    socket.current.on('getUsers', (users) => {
      // console.log(users);
    });
  }, [currentUser]);

  const handleMessageChange = (e) => {
    setMessageText(e.target.value);
  };

  const sendMessage = () => {
    if (messageText) {
      socket.current.emit('sendMessage', {
        senderId: currentUser.id,
        receiverId: recipient.id,
        text: messageText,
        conversationId: currentConversation,
      });
      setMessages((prev) => [
        ...prev,
        {
          senderId: currentUser.id,
          receiverId: recipient.id,
          text: messageText,
          conversationId: currentConversation,
        },
      ]);
      axios
        .post('/routes/message', {
          senderId: currentUser.id,
          receiverId: recipient.id,
          text: messageText,
          conversationId: currentConversation,
        })
        .then(() => {
          setMessageText('');
        });
    }
  };

  const getMessages = async () => {
    const res = await axios.get('/routes/message', {
      params: {
        // change to currentConversation
        conversationId: currentConversation,
      },
    });
    setMessages(res.data);
  };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get('/routes/profile/user');
      setCurrentUser(data);
      setTheme(
        data.theme === null
          ? themes.light
          : data.theme === 'light'
          ? themes.light
          : data.theme === 'dark'
          ? themes.dark
          : themes.light
      );
    };
    const getUsers = () => {
      axios.get('/routes/userDatabase/users').then((users) => {
        setUsers(users.data);
      });
    };
    const getHist = async () => {
      try {
        const { data } = await axios.get('/routes/poker/poker/history');
        setMatches(data);
      } catch (err) {
        console.error(err, 'get hist social page');
      }
    };
    getHist();
    getUser();
    getUsers();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const getFriends = () => {
        axios
          .get(`/routes/userDatabase/friends/${currentUser?.id}`)
          .then((friends) => {
            setFriends(friends.data);
          });
      };
      getFriends();
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentConversation && recipient) {
      getMessages();
    }
    // get messages
  }, [currentConversation, recipient]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <SocialStyles className='wut' style={{ ...theme, minHeight: '100vh' }}>
      <div className='social' style={{ maxWidth: '100%', display: 'flex' }}>
        <div className='friends'>
          <div className='friendsListWrapper'>
            <h6 style={{ fontWeight: 'bold' }}>Friends</h6>
            <div className='friendList'>
              {friends?.length !== 0 ? (
                friends?.map((f) => {
                  return (
                    <Conversation
                      user={f}
                      key={f.sub + 'friend'}
                      currentUser={currentUser}
                      setCurrentConversation={setCurrentConversation}
                      setRecipient={setRecipient}
                    />
                  );
                })
              ) : (
                <h4>Add friends to chat!</h4>
              )}
            </div>
          </div>
          <div className='addFriendsWrapper'>
            <h6 style={{ fontWeight: 'bold' }}>Add Friends</h6>
            <div className='addFriends'>
              {friends &&
                users?.map((u) => {
                  const isFriend = friends.every((f) => f.id !== u.id);
                  if (u.id !== currentUser?.id && isFriend) {
                    return (
                      <PossibleFriend
                        user={u}
                        key={u.sub + 'pf'}
                        currentUser={currentUser}
                        setFriends={setFriends}
                      />
                    );
                  }
                })}
            </div>
          </div>
        </div>
        <div className='messages'>
          {messages ? (
            <div className='messagesWrapper'>
              <h4 style={{ textAlign: 'center' }}>{recipient?.name}</h4>
              <div className='messagesTop'>
                {messages &&
                  messages.map((m) => {
                    if (m.senderId === currentUser.id) {
                      return (
                        <div ref={scrollRef}>
                          <Message
                            own={true}
                            message={m}
                            recipient={recipient}
                            currentUser={currentUser}
                            key={m.id + 'message'}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div ref={scrollRef}>
                          <Message
                            message={m}
                            recipient={recipient}
                            currentUser={currentUser}
                            key={m.id + 'message'}
                          />
                        </div>
                      );
                    }
                  })}
              </div>
              <div className='messagesBottom'>
                <textarea
                  value={messageText}
                  onChange={handleMessageChange}
                  className='messagesInput'
                  placeholder='Write something ...'
                ></textarea>
                <button className='messagesSubmit' onClick={sendMessage}>
                  Send
                </button>
              </div>
            </div>
          ) : (
            <h1 style={{ textAlign: 'center', color: 'lightgoldenrodyellow' }}>
              Click a friend to chat!
            </h1>
          )}
        </div>
        <div className='matches'>
          <div className='matchesWrapper'>
            <h6 style={{ fontWeight: 'bold' }}>Match History</h6>
            {matches?.map((m) => {
              return (
                <Match
                  match={m}
                  key={m.deckId + 'matches'}
                  win={m.netEarnings > 0 ? true : false}
                />
              );
            })}
          </div>
        </div>
      </div>
    </SocialStyles>
  );
};

export default Social;
