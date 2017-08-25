var db = require("./db");
var hashToSHA1 = require("sha1");
var generateToken = require("./GenerateToken");
var async = require('async');
var base64_encode = function(val){
  var encode = null;
  if(val){
    encode = new Buffer(val).toString('base64');
  }
  return encode;
};
var base64_decode = function(val){
  var decode = null;
  if(val){
    decode = new Buffer(val,'base64').toString('ascii');
  }
  return decode;
}
const SUCCESS = true;
const FAIL = false;
db.init();

function API(){
  this.findToken = function(token, cb) {
    process.nextTick(function() {
      db.que('SELECT token FROM akun WHERE token = ?',token,function(err,data){
        if(err){
          return cb(err, null);
        }else{
          return cb(null, data);
        }
      });
    });
  };

  this.getDevice = function(req,res){
    var id_device = req.params.id;
    if(id_device){
      db.que('SELECT * FROM device WHERE device_id = ?',id_device,function(err,data){
        if(err){
          res.status(400).json({status:FAIL,result:err});
        }else{
          res.status(200).json({status:SUCCESS,result:data});
        }
      });
    }else{
      res.status(400).json({status:FAIL,result:'params not found'});
    }
  };

  this.loginAwal = function(req,res){
    var email = base64_decode(req.body.email);
    var pass = base64_decode(req.body.password);
    if(email && pass){
      db.que('SELECT * FROM akun WHERE email = ? AND kata_sandi = ?',[email,hashToSHA1(pass)],function(err,data){
        if(err){
          res.status(400).json({status:FAIL,result:err});
        }else{
          res.status(200).json({status:SUCCESS,result:[{token:data[0].token}]});
        }
      });
    }else{
      res.status(400).json({status:FAIL,result:'params not found'});
    }
  };

  this.signUp = function(req,res){
    var email = base64_decode(req.body.email);
    var nama = base64_decode(req.body.name);
    var password = hashToSHA1(base64_decode(req.body.password));
    if(email && nama && password){
      var tok = generateToken.getToken(email,password);
      db.que('INSERT INTO akun (email,nama,kata_sandi,token) VALUES (?,?,?,?)',[email,nama,password,tok],function(err,data){
        if(err){
          if(err=='other'){
            res.status(200).json({status:SUCCESS});
          }else{
            res.status(400).json({status:FAIL,result:err});
          }
        }else{
          res.status(200).json({status:SUCCESS});
        }
      });
    }else{
      res.status(400).json({status:FAIL,result:'params not found'});
    }
  };
}

module.exports = new API();
