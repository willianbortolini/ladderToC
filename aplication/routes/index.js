var express = require('express');
var router = express.Router();

var pessoas = [
  {
      'nome': 'Paulo',
      'idade': 12
  },
  {
      'nome': 'Jõao',
      'idade': 15,
  },
  {
      'nome': 'Marina',
      'idade': 25,
  },
]
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {pessoas: pessoas});
});

module.exports = router;
