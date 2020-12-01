// require our models
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const port = process.env.PORT || 3000;


require('dotenv').config();

const app = express();

require('./config/database');
require('./config/passport');


const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    console.log(req.session);
    next();
});

app.use('/', indexRoutes);
app.use('/', userRoutes);

app.listen(port, () => {
    console.log(`Express is listening on port:${port}`);
  });
  


