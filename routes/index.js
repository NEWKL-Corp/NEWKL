const express = require('express');
const router = express.Router();

// Routers
const boardRouter = require('./board');

// Constatns

router.use('/board', boardRouter);

module.exports = router;
