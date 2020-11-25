const router = require('express').Router();
const userCtrl = require('../controllers/users');

router.get('/users', userCtrl.index);

router.get('/applications/new', userCtrl.showAppl);

router.post('/applications', userCtrl.newAppl);


module.exports = router;
