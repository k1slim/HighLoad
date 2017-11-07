const express = require('express');
const auth = express.Router();
const common = express.Router();

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).end();
}

const authRouter = (passport) => {
    auth.post('/api/login', passport.login);
    auth.post('/api/register', passport.register);
    auth.get('/api/logout', passport.logout);

    return auth;
};

const commonRouter = (db, passport) => {
    common.get('/api/user', isLoggedIn, passport.getUser);

    common.get('/api/tweet', isLoggedIn, db.getTweets);
    common.post('/api/tweet', isLoggedIn, db.createTweet);

    common.delete('/api/tweet/:id', isLoggedIn, db.deleteTweet);
    common.put('/api/tweet/:id', isLoggedIn, db.updateTweet);

    return common;
};

module.exports = {
    authRouter,
    commonRouter
};
