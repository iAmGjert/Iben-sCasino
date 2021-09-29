const express = require('express');
const ClientId = express.Router();
const cId = require('dotenv').config();


ClientId.get('/', async (req, res) => {
  
  try {
    console.log('endpt');
    console.log('cid', cId);
    res.status(201).send(cId);
  } catch (err) {
    console.log(err);
  }
});  


module.exports = {ClientId};