const express = require('express');
const path = require('path');
const app = express();
const blj = require('./routes/blackjack')

const port = 1337;

app.use(express.json())

const frontend = path.resolve(__dirname, '..', 'client', 'dist');

app.use('/routes/blackjack', blj.Blackjack)

app.use(express.static(frontend));


app.listen(port, () => {
  console.log(`Server is Listening on ${port}`);
});

