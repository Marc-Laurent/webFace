var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/accueil', function(req, res, next) {
  res.redirect('/');
});


router.get('/recap', function(req, res, next) {
  console.log("==============");
  res.render('recap');
});

router.get('/cancel-order', function(req, res, next) {
  res.render('cancel-order');
});

module.exports = router;
