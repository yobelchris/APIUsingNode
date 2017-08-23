var db = require("./db");
const SUCCESS = true;
const FAIL = false;
db.init();

function API(){
  this.findToken = function(token, cb) {
    process.nextTick(function() {
      db.acquire(function(err,con){
        if(err){
          console.log(err);
          return cb(null, null);
        }else{
          con.query('SELECT token FROM akun WHERE token = ?',token,function(err,data){
            con.release();
            if(err){
              return cb(err, null);
            }else{
              return cb(null, data);
            }
          });
        }
      })
    });
  };

  this.get = function(req,res,next){
    db.acquire(function(err,con){
      if(err){
        console.log(err);
        res.json({status:'400',status:FAIL,result:err});
      }else{
        con.query('SELECT * FROM device WHERE device_id = ?',req.params.id,function(err,data){
          con.release();
          if(err){
            res.json({status:'500',status:FAIL,result:err});
          }else{
            res.json({status:'200',status:SUCCESS,result:data});
          }
        });
      }
    });
  };
}

module.exports = new API();
