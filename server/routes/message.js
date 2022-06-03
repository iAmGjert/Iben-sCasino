const { Message, Conversation, User } = require('../../db/index.js');
const express = require('express');
const { Op } = require('sequelize');

const message = express.Router();

// gets a conversation based on data you send to body
// going to post a message and we are going to get all messages by conversationID

message.get('/', (req, res) => {
  const { conversationId } = req.query;
  Message.findAll({
    where: {
      conversationId: conversationId,
    },
  }).then((messages) => {
    res.status(200).send(messages);
  });
});

message.post('/', (req, res) => {
  const { senderId, receiverId, text, conversationId } = req.body;
  let sender, receiver, message, conversation;
  User.findByPk(receiverId)
    .then((data) => {
      receiver = data;
      return User.findByPk(senderId);
    })
    .then((data) => {
      sender = data;
      return Message.create({ text: text });
    })
    .then((data) => {
      message = data;
      return Conversation.findByPk(conversationId);
    })
    .then((data) => {
      conversation = data;
      message.setSender(sender);
      message.setReceiver(receiver);
      message.setConversation(conversation);
    })
    .then(() => {
      res.sendStatus(200);
    });
});

module.exports = { message };
