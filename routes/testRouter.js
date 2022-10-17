const { testCtrl } = require('../controllers/testController');
const router = require('express').Router();

router.route('/').get(testCtrl.getText);
module.exports = router;
