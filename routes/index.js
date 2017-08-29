var express = require('express');
var user = require("../api/user");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/device/(:id)?',passport.authenticate('bearer',{session: false}),user.getDevice);
router.get('/profile',passport.authenticate('bearer',{session: false}),user.profile);
router.put('/update',passport.authenticate('bearer',{session: false}),user.updateDevice);
router.get('/login',passport.authenticate('bearer',{session: false}),user.login);
router.post('/login',user.loginAwal);
router.post('/SignUp',user.signUp);
router.post('/login/withGmail',user.withGmail);

module.exports = router;
