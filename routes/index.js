const express = require('express')
const router = express.Router()
const path = require('path')

// Routers
const boardRouter = require('./board')
const commentRouter = require('./comment')

// Constatns
router.use('/board', boardRouter)
router.use('/comment', commentRouter)

module.exports = router
