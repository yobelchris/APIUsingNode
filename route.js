var user = require('./UserAPI');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;

passport.use(new Strategy(
  function(token, cb) {
    user.findToken(token, function(err, data) {
      if (err) { return cb(err); }
      if (!data) { return cb(null, false); }
      return cb(null, data);
    });
  }));

module.exports = {
  configure: function(app) {
    app.route('/device/(:id)?').get(passport.authenticate('bearer',{session: false}),user.getDevice);
    app.route('/profile').get(passport.authenticate('bearer',{session: false}),user.profile);
    app.route('/update').put(passport.authenticate('bearer',{session: false}),user.updateDevice);
    app.route('/login').get(passport.authenticate('bearer',{session: false}),user.login);
    app.route('/login').post(user.loginAwal);
    app.route('/SignUp').post(user.signUp);
    app.route('/login/withGmail').post(user.withGmail);
  }
};
