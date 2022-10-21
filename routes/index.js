const express = require('express')
const router = express.Router()
const path = require('path')

// Routers
const boardRouter = require('./board')

// Constatns

router.use('/board', boardRouter)

module.exports = router
