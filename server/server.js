// // server.js

// // BASE SETUP
// // =============================================================================

// // call the packages we need
// var express    = require('express');        // call express
// var app        = express();                 // define our app using express
// var bodyParser = require('body-parser');

// // configure app to use bodyParser()
// // this will let us get the data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// var port = process.env.PORT || 8080;        // set our port
// const pg = require('pg');
// const connectionString = process.env.DATABASE_URL || 'postgres://docker:docker@db:5432/docker';

// // ROUTES FOR OUR API
// // =============================================================================
// var router = express.Router();              // get an instance of the express Router

// // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });   
// });
// router.get('/bears', function(req, res) {
//     res.json({ message: 'TO GET SOME BEARS' });   
// });

// router.get('/database', function(req, res) {

//     // res.json({ message: 'TO GET SOME BEARsssssS' });   
//     const client = new pg.Client(connectionString);
//     client.connect();
//     const query = client.query(
//     'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
//     query.on('end', () => { client.end(); });


// });


// // more routes for our API will happen here

// // REGISTER OUR ROUTES -------------------------------
// // all of our routes will be prefixed with /api
// app.use('/api', router);

// // START THE SERVER
// // =============================================================================
// app.listen(port);
// console.log('Magic happens on port ' + port);

var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    dotenv          = require('dotenv'),
    bodyParser      = require('body-parser');

var app = express();

dotenv.load();

// Parsers
// old version of line
// app.use(bodyParser.urlencoded());
// new version of line
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
}

app.use(require('./app/anonymous-routes'));
app.use(require('./app/json-routes'));
app.use(require('./app/protected-routes'));
app.use(require('./app/user-routes'));

var port = process.env.PORT || 8080;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
