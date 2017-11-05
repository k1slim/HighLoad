const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('./server/mongoose');
const config = require('./server/config');
const Twitter = require('ntwitter');
const streamHandler = require('./server/helpers/streamingHelper');
const passport = require('./server/user');
const app = express();

const server = app.listen(config.express.port);

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'high-load-17',
    resave: true,
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    next();
});

app.use(passport.pass.initialize());
app.use(passport.pass.session());

app.route('/api/session').get(passport.getSession);
app.route('/api/login').post(passport.login);
app.route('/api/register').post(passport.register);
app.route('/api/logout').get(passport.logout);

const twit = new Twitter(config.twitter);

const io = require('socket.io').listen(server);

app.route('/api/tweet').get(db.getTweets);
app.route('/api/tweet').post(db.createTweet);
app.route('/api/tweet/:id')
    .delete(db.deleteTweet)
    .put(db.updateTweet);

// twit.stream('statuses/filter', { 'locations': '-122.75,36.8,-121.75,37.8,-74,40,-73,41' }, function (stream) {
//     streamHandler(stream, io);
// });
