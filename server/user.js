const passport = require('passport');
const uuid = require('uuid/v4');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./schemes/userScheme');

passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({ username })
            .then((user) => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect credential' });
                }
                if (!user.comparePassword(password)) {
                    return done(null, false, { message: 'Incorrect credential' });
                }
                return done(null, user);
            })
            .then(null, err => done(err));
    }
));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) =>
    User.findById(id)
        .then(user => done(null, user))
        .then(null, err => done(err)));

function login(req, res, next) {
    const isSessionEnable = (req.query.session === 'true');

    passport.authenticate('local', function (err, user, info) {
        if (err) {
            res.send(404, info);
            return next(err);
        }
        if (!user) {
            res.send(404, info);
            return next(err);
        }
        req.logIn(user, { session: isSessionEnable }, function (err) {
            if (err) {
                return next(err);
            }
            return res.send({
                message: 'Login successful',
                user: { id: user.id, username: user.username }
            });
        });
    })(req, res, next);
}

function logout(req) {
    req.session.destroy();
    req.logout();
}

function register(req, res) {
    const user = new User;
    user.id = uuid();
    user.username = req.body.username;
    user.pass = req.body.password;
    user.save()
        .then(() => res.send({
            message: 'SignUp successful',
            user: { id: user.id, username: user.username }
        }))
        .catch(() => res.send(409, { message: 'This email address has already registered' }));
}

function getSession(req, res) {
    const user = req.user;
    res.send(user ? { user: { id: user.id, username: user.username } } : 'false');
}

module.exports = {
    pass: passport,
    login: login,
    logout: logout,
    register: register,
    getSession: getSession
};