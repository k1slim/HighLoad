const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Twitter = require('ntwitter');

const db = require('./server/mongoose');
const config = require('./server/config');
const router = require('./server/router');
const passport = require('./server/user');
const sockets = require('./server/sockets');
const twitterStreaming = require('./server/helpers/streamingHelper');

const app = express();
const server = app.listen(config.express.port);
const io = require('socket.io').listen(server);
const twit = new Twitter(config.twitter);

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

app.use(router.authRouter(passport));
app.use(router.commonRouter(db, passport));

sockets(io);
twitterStreaming.init(twit);
