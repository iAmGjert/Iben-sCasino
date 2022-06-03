const { Conversation } = require('../../db/index.js');
const express = require('express');
const { Op } = require('sequelize');

const conversation = express.Router();

// gets a conversation based on data you send to body
conversation.get('/', (req, res) => {
  const { senderId, receiverId } = req.query;
  Conversation.findOne({
    where: {
      [Op.or]: [
        { user1: senderId, user2: receiverId },
        { user1: receiverId, user2: senderId },
      ],
    },
  }).then((convo) => {
    if (convo === null) {
      Conversation.create({ user1: senderId, user2: receiverId }).then(
        (data) => {
          res.status(200).send({
            conversationId: data.id,
          });
          console.log(data);
        }
      );
    } else {
      res.status(200).send({
        conversationId: convo.id,
      });
    }
  });
});

module.exports = { conversation };
