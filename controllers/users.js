const User = require('../models/user');


module.exports = {
    index,
    showAppl,
    newAppl,
}

function index(req, res) {
    User.find({}, function (err, users) {

        if (!req.user) { req.user = users[0] }

        res.render('users/index', {
            users,
            appUser: req.user,
            title: req.user ? `Hey ${req.user.name}, here are your applications so far` : 'Welcome',
        });
    });
};

function showAppl(req, res) {
    User.find({}, function (err, users) {

        res.render('applications/new', {
            appUser: users,
            title: 'Fill out the form below to add your latest application',
        });
    })
};

function newAppl(req, res) {
    User.find({}, function (err, users) {
        users[0].applications.push(req.body);

        users[0].save(function (err) {
            res.redirect('/users')
        });

    })

};