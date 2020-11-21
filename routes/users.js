const router = require('express').Router();
const userCtrl = require('../controllers/users');

router.get('/users/index', userCtrl.index);


module.exports = router;
