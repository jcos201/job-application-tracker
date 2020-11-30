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
            title: req.user ? `Hey ${req.user.name}, here are your applications so far` : 'Welcome',
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
        //console.log('showAppl users applications using req.params.id:')

        //console.log(users[0].applications.find(appl => appl.id === req.params.id))

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

        application = users[0].applications.find(appl => appl.id === req.params.id)
        console.log('first console.log');
        console.log(application);
        req.body.done = false;
        users[0].applications.splice(indx, 1, req.body);

        application1 = users[0].applications.find(appl => appl.id === req.params.id)
        console.log('second console.log');
        console.log(application1);
        
        console.log('users:');
        console.log(users);
        users[0].save(function (err) {
            res.redirect('/users')
        });
    })
};


function deleteAppl(req,res) {

};