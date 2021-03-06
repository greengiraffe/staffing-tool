// ========================================
// Import modules
// ========================================
const config = require('./config/config');
const appRoutes = require('./server/routes');
const setupPassport = require('./server/services/passport');

let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
// let seed = require('seed-mongoose')({
//     path: 'config/fixtures/'
// });
let mongoose = require('mongoose');
let passport = require('passport');
let expressSession = require('express-session');
let flash = require('flash');

let app = express();


// ========================================
// App Setup

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession(config.sessions));
app.use(flash());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
setupPassport();


// opens api to external domains
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});

// ================================================
// Set promise libary to bluebird
mongoose.Promise = require('bluebird');
// Connect to database
mongoose.connect(config.database.uri);

// ================================================
app.use('/api/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.render('index');
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function (err, req, res, next) {
//         res.status(err.status || 500);
//         res.json({
//             message: err.message,
//             error: err
//         });
//     });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


module.exports = app;
