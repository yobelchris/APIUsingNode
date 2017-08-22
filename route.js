var user = require('./UserAPI');

module.exports = {
  configure: function(app) {
    app.route('/UserAPI/:id').get(user.get);
  }
};
