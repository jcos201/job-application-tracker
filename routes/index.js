const passport = require('passport');
const router = require('express').Router();
const userCtrl = require('../controllers/users');


router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

router.get('/oauth2callback', passport.authenticate('google', {
    successRedirect: '/users',
    failureRedirect: '/',
}));

router.get('/logout', function(req, res) {
    req.logOut();
    res.redirect('/')
});

router.get('/', function(req, res) {
    res.render('index', {title: 'My Home Page'});
});


module.exports = router;