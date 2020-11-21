const User = require('../models/user');


module.exports = {
    index,
}

function index(req, res) {
    console.log('index function in user controllers accessed')
    User.find({}, function(err, users) {
        res.render('users/index', {
            users,
            appUser: req.user,
            title: 'Here are your applications so far'
        })
    })
};
