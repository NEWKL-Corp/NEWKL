require('dotenv').config();

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const route = require('./routes/index');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//도메인 접속 시 index.html 반환
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/board.html');
});

app.use('/api', route);

const port = process.argv[2] || process.env.PORT;
app.listen(port, () => {
  console.log('Server listening on port : ', port);
});
