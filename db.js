var mysql = require("mysql");
var generateToken = require("./GenerateToken");
function Connection() {

  this.pool = null;

  var konek = {
    connectionLimit : 100,
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

  this.que = function(quer,body,callback){
    this.acquire(function(err,con){
      if(err){
        console.log(err);
        return callback(err,null);
      }else{
        con.query(quer,body,function(err,data){
          con.release();
          if(err){
            return callback(err,null);
          }else if (data.length > 0) {
            return callback(null,data);
          }else{
            return callback('other',null);
          }
        });
      }
    });
  }

};
module.exports = new Connection();
