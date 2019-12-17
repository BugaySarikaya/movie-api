var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
  const { username, password } = req.body;
  
  //sifreyi hashledik
  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      username,
      password: hash
    });
  
    const promise = user.save();
    promise.then((data) => {
      res.json(data)
    }).catch((err) => {
      res.json(err);
    })
  });
//modelden direk karsılık gelen username e atadı
});

module.exports = router;
