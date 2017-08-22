var express = require('express');
var app = express();

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'db_adroit'
});

const SUCCESS = true;
const FAIL = false;

app.get('/', function (req, res) {
  connection.connect();
  connection.query("SELECT * FROM akun", function (err, data){
  	if(err){
  		console.log(err);
  		res.json({status:'400',message: 'Failed',result:[]});
  	}else{
  		res.json({status:'200',message:'Success',result:data});
  	}
  });
})

app.listen(3000,function () {
	console.log('Listening to port 3000')
})
