const express = require('express')
const Action = require('../models/Action')
const axios = require('axios').default

const router = express.Router()

router.get('', (req, res) => {
  res.render('form')
})

router.post('/phone', (req, res) => {
  const phoneNumber = req.body.phone

  const code = Math.floor(Math.random() * (1000000 - 100000)) + 100000

  var encCode = encodeURI(`Your message is: ${code}`)
  var url = `https://smsc.ru/sys/send.php?login=luvr&psw=hubqaq-3bicru-zAvmav&phones=${phoneNumber}&mes=${encCode}`
  axios.get(url)
    .then((response) => {
      console.log(response)
      res.status(200).send({ rightCode: code })
    })
    .catch((err) => {
      res.json({ sendingError: err })
    })
})

router.post('/code', (req, res) => {
  const recievedCode = +req.body.code
  const rightCode = +req.body.rightCode

  if (recievedCode === rightCode) {
    Action.create({ number: +req.body.actionNumber }, (err, action) => {
      if (err) res.json({ databaseError: err })
      console.log(action)
    })
    res.status(200).send({ msg: "Action allowed!" })
  } else {
    res.status(503).send({ msg: "Incorrect code..." })
  }
})

module.exports = router

