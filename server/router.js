module.exports = (app, db, passport) => {
    app.route('/api/session').get(passport.getSession);
    app.route('/api/login').post(passport.login);
    app.route('/api/register').post(passport.register);
    app.route('/api/logout').get(passport.logout);

    app.route('/api/tweet').get(db.getTweets);
    app.route('/api/tweet').post(db.createTweet);
    app.route('/api/tweet/:id')
        .delete(db.deleteTweet)
        .put(db.updateTweet);
};