require('dotenv').config()

const express = require('express')
const http = require('http')
const fs = require('fs')
const cors = require('cors')
const path = require('path')

const route = require('./routes/index')

const app = express()

app.use(express.static('img'))
app.use(express.static('style'))
app.use(express.static('src'))
app.use(express.static('nkl'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// //도메인 접속 시 index.html 반환
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})
app.get('/parking', (req, res) => {
  res.sendFile(path.join(__dirname, './parking.html'))
})
app.get('/newklworld', (req, res) => {
  res.sendFile(path.join(__dirname, './nkl/ctx/newklworld.html'))
})

app.use('/', route)

const port = process.argv[2] || process.env.PORT
app.listen(port, () => {
  console.log('Server listening on port : ', port)
})
