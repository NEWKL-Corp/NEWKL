// const { testCtrl } = require('../controllers/boardController');
const router = require('express').Router();

router.post('/post', async (req, res) => {
  const { title, contents } = req.body;
  console.log('title :', title, 'contents :', contents);
});

module.exports = router;
