var express = require('express');
var router = express.Router();
var inputs = [
  {
    'port': '13',
    'name': 'I 13'
  },
  {
    'port': 'A0',
    'name': 'I A0'
  },
  {
    'port': 'A1',
    'name': 'I A1'
  },
  {
    'port': 'A2',
    'name': 'I A2'
  },
  {
    'port': 'A3',
    'name': 'I A3'
  },
  {
    'port': 'A6',
    'name': 'I A6'
  },
  {
    'port': 'A7',
    'name': 'I A7'
  },
  {
    'port': '2',
    'name': 'I 2'
  },
  {
    'port': '3',
    'name': 'I 3'
  }
]

var outputs = [
  {
    'port': '11',
    'name': 'Out 11'
  },
  {
    'port': '10',
    'name': 'Out 10'
  },
  {
    'port': '9',
    'name': 'Out 9'
  },
  {
    'port': '8',
    'name': 'Out 8'
  },
  {
    'port': '7',
    'name': 'Out 7'
  },
  {
    'port': '6',
    'name': 'Out 6'
  },
  {
    'port': '5',
    'name': 'Out 5'
  }
]

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { inputs: inputs, outputs: outputs });
});

module.exports = router;
