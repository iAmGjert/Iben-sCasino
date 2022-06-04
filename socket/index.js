const io = require('socket.io')(8900, {
  cors: {
    origin: [
      'http://localhost:1337',
      'http://ec2-54-202-187-31.us-west-2.compute.amazonaws.com:1337',
    ],
  },
});

let users = [];

const addUser = (userId, socketId) => {
  if (userId) {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  }
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on('connection', (socket) => {
  // on connect
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });
  //send and get message
  socket.on('sendMessage', ({ senderId, receiverId, text, conversationId }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit('getMessage', {
        senderId,
        text,
        receiverId,
        conversationId,
      });
    }
  });

  // on disconnect
  socket.on('disconnect', () => {
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
