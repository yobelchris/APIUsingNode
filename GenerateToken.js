var hashToSHA1 = require("sha1");
var base64_encode = function(val){
  return new Buffer(val).toString('base64');
};


function randomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};

function generateToken(){
    this.getToken = function(email,password){
      var length1 = Math.floor(Math.random() * 3) + 1;
      var length2 = Math.floor(Math.random() * 6) + 5;
      var randnumb1 = randomString(length1);
      var randnumb2 = randomString(length2);
      var hash = base64_encode(randnumb1+"?"+base64_encode(email+password)+"!"+randnumb2);
      return hash;
    };

    this.getPass = function(){
      var length1 = Math.floor(Math.random() * 6) + 5;
      var length2 = Math.floor(Math.random() * 3) + 1;
      var randnumb1 = randomString(length1);
      var randnumb2 = randomString(length2);
      var password = hashToSHA1(randnumb1+randnumb2);
      return password;
    };
};

module.exports = new generateToken();
