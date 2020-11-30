const router = require('express').Router();
const { deleteAppl } = require('../controllers/users');
const userCtrl = require('../controllers/users');

router.get('/users', userCtrl.index);

router.get('/applications/new', userCtrl.showAllAppl);

router.get('/applications', userCtrl.index);

router.post('/applications', userCtrl.newAppl);

router.get('/applications/:id', userCtrl.showAppl);

router.put('/applications/:id', userCtrl.updateAppl);

router.delete('/delete/:id', deleteAppl);


module.exports = router;
