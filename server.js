require('dotenv').config();

const express = require('express');
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const route = require('./routes/index');
const app = express();
app.use(express.static('src'));
app.use(express.static('static'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', route);

const port = process.argv[2] || process.env.PORT;

app.listen(port, () => {
    console.log('Server listening on port : ', port);
});
