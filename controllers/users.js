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
 //   console.log('req.user before findOne')
 //   console.log(req.user)

    User.findOne({'googleId':req.user.googleId}, function (err, users) {

  //      if(req.user) {
  //          console.log('req.user.name found')
  //          console.log(req.user.name)
  //      }

       // if (!req.user) { req.user = users[0] }


  //      console.log('req.user after fine one')
  //      console.log(req.user)

  //      console.log('users from function')
 //      console.log(users)

        res.render('users/index', {
            users,
            appUser: req.user,
            title: req.user ? req.user.applications.length > 0 ? `Hey ${req.user.name}, here are your applications so far` : `Hey ${req.user.name}, here is where you can see your applications after you enter them` : 'Welcome',
        });
    });
};

function showAllAppl(req, res) {
    User.findOne({'googleId':req.user.googleId}, function (err, users) {

        res.render('applications/new', {
            appUser: users,
            title: 'Fill out the form below to add your latest application',
        });
    })
};

function newAppl(req, res) {
    console.log('req.user before find in newAppl')
    console.log(req.user)
    User.findOne({'googleId':req.user.googleId}, function (err, users) {
        users.applications.push(req.body);
        users.save(function (err) {
            res.redirect('/users')
        });

    })

};

function showAppl(req, res) {
    User.findOne({'googleId':req.user.googleId}, function (err, users) {

        application = users.applications.find(appl => appl.id === req.params.id);
        res.render('applications/show', {
            applicationID: req.params.id,
            appUser: users,
            application,
            title: 'Update the information below or cancel',
        })
    })

}

function updateAppl(req, res) {
    User.findOne({'googleId':req.user.googleId}, function (err, users) {
        req.body._id = req.params.id;

        indx =  users.applications.indexOf(users.applications.find(appl => appl.id === req.params.id));

        console.log('req.body.dateApplied')
        console.log(req.body.dateApplied)

        req.body.done = false;
        users.applications.splice(indx, 1, req.body);

        users.save(function (err) {
            res.redirect('/users')
        });
    })
};


function deleteAppl(req,res) {
    User.findOne({'googleId':req.user.googleId}, function (err, users) {
        req.body._id = req.params.id;
    
        indx =  users.applications.indexOf(users.applications.find(appl => appl.id === req.params.id));
    
        req.body.done = false;
        users.applications.splice(indx, 1);
    
        users.save(function (err) {
            res.redirect('/users')
        });
    })

};