const User = require('../models/user');


module.exports = {
    index,
    showAppl,
    newAppl,
}

function index(req, res) {
    User.find({}, function(err, users) {
        console.log('req.user:')
        console.log(req.user)
        res.render('users/index', {
            users,
            appUser: req.user,
            title: req.user ? `Hey ${req.user.name}, here are your applications so far` : 'Welcome',
        });
    });
};

function showAppl(req, res) {
    User.find({}, function(err, users) {
        console.log('Users:')
        console.log(users)
        res.render('applications/new', {
            appUser: users,
            title: 'Fill out the form below to add your latest application',
        });
    })
};


function newAppl(req, res) {
    req.appUser.applications.push(req.body);
    req.appUser.save(function(err) {
        res.redirect('/users');
    });
};
