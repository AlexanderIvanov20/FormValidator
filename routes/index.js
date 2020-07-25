const express = require('express')
const Action = require('../models/Action')
const fs = require('fs');

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  var baseNumber = JSON.parse(fs.readFileSync('options.json', 'utf8')).baseNumber

  Action.find({})
    .then((values) => {
      values.forEach((value) => {
        baseNumber -= +value.number
      })
      values = values.reverse()
      res.render('index', { objects: values, baseNumber })
    })
    .catch((err) => {
      res.json({ databaseError: err })
    })
});

module.exports = router