const User = require('../models/user');


module.exports = {
    index,
    showAppl,
    newAppl,
}

function index(req, res) {
    console.log('req.user:')
    console.log(req.user)
    console.log('req.body:')
    console.log(req.body)
    
    
    User.find({}, function(err, users) {
        console.log('users in index:')
        console.log(users)
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
    console.log('req.body:')
    console.log(req.body)
    
    User.find({}, function(err, users) {
        console.log('users from newAppl');
        console.log(users);
        users[0].applications.push(req.body);

        users[0].save(function(err){
            res.redirect('/users')
        });

    })

};
