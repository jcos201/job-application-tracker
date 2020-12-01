const User = require('../models/user');


module.exports = {
    index,
    showAllAppl,
    newAppl,
    showAppl,
    updateAppl,
    deleteAppl,
}

function index(req, res) {
    User.find({}, function (err, users) {

        if (!req.user) { req.user = users[0] }

        

        res.render('users/index', {
            users,
            appUser: req.user,
            title: req.user ? req.user.applications.length > 0 ? `Hey ${req.user.name}, here are your applications so far` : `Hey ${req.user.name}, here is where you can see your applications after you enter them` : 'Welcome',
        });
    });
};

function showAllAppl(req, res) {
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

function showAppl(req, res) {
    User.find({}, function (err, users) {

        application = users[0].applications.find(appl => appl.id === req.params.id);
        res.render('applications/show', {
            applicationID: req.params.id,
            appUser: users,
            application,
            title: 'Update the information below or cancel',
        })
    })

}

function updateAppl(req, res) {
    User.find({}, function (err, users) {
        req.body._id = req.params.id;

        indx =  users[0].applications.indexOf(users[0].applications.find(appl => appl.id === req.params.id));

        console.log('req.body.dateApplied')
        console.log(req.body.dateApplied)

        req.body.done = false;
        users[0].applications.splice(indx, 1, req.body);

        users[0].save(function (err) {
            res.redirect('/users')
        });
    })
};


function deleteAppl(req,res) {
    User.find({}, function (err, users) {
        req.body._id = req.params.id;
    
        indx =  users[0].applications.indexOf(users[0].applications.find(appl => appl.id === req.params.id));
    
        req.body.done = false;
        users[0].applications.splice(indx, 1);
    
        users[0].save(function (err) {
            res.redirect('/users')
        });
    })

};