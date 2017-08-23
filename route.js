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
    app.route('/UserAPI/(:id)?').get(passport.authenticate('bearer',{session: false}),user.get);
  }
};
