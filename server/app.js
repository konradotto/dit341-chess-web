var dotenv = require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var cors = require('cors');

var usersController = require('./entities/user/userRouter');
var ratingsController = require('./entities/rating/ratingRouter');
var gamesController = require('./entities/game/gameRouter');
var puzzlesController = require('./entities/puzzle/puzzleRouter');
var timeControlsController = require('./entities/timecontrol/timecontrolRouter');
var commentsController = require('./entities/comment/commentRouter');
var commentRelationsController = require('./entities/comment/commentRelationsRouter');

var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chessDb';
var port = process.env.PORT || 3000;


// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.dropCollection('timecontrols');
    db.collection('timecontrols').insertOne({time: 10, increment_: 15, identifier: "slow"});
    db.collection('timecontrols').insertOne({time: 5, increment_: 10, identifier: "fast"});;
});

// App configuration
var app = express();
app.use(bodyParser.json());            // Parse requests of content-type 'application/json'
app.use(morgan('dev'));                // HTTP request logger
app.options('*', cors());              // Enable cross-origin resource sharing for frontend must be registered before api
app.use(cors());

// Endpoints
app.use('/api/v1/users', usersController)
app.use('/api/v1/ratings', ratingsController)
app.use('/api/v1/games', gamesController);
app.use('/api/v1/puzzles', puzzlesController);
app.use('/api/v1/comments', commentsController);
app.use('/api/v1/timecontrols', timeControlsController);
app.use('/api/v1/games', commentRelationsController);

app.get('/api/v1', function(req, res) {
    res.json({'message': 'Welcome to our DIT341 backend ExpressJS project!'});
});

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        err_res['error'] = err;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
