var mysql = require("mysql");
function Connection() {

  this.pool = null;

  var konek = {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'db_adroit'
  };

  this.init = function() {
    this.pool = mysql.createPool(konek);
  }

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}
module.exports = new Connection();
