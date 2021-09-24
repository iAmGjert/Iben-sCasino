const express = require('express');
const path = require('path');
const app = express();

const port = 1337;

const frontend = path.resolve(__dirname, '..', 'client', 'dist');

app.use(express.static(frontend));


app.listen(port, () => {
  console.log(`Server is Listening on ${port}`);
});

