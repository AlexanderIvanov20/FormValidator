const express = require('express')
const Action = require('../models/Action')
const axios = require('axios').default

const router = express.Router()

router.get('', (req, res) => {
  res.render('form')
})

router.post('', async (req, res) => {
  const actionNumber = +req.body.numberValue
  req.session.actionValue = actionNumber

  // Action.create({ number: actionNumber }, (err, action) => {
  //   if (err) res.json({ databaseError: err })
  //   console.log(action)
  // })

  res.redirect('/form/phone')
})

router.get('/phone', (req, res) => {
  res.render('formPhone')
})

router.post('/phone', (req, res) => {
  const phoneNumber = req.body.phone

  const code = Math.floor(Math.random() * (1000000 - 100000)) + 100000
  req.session.specialCode = code

  var encCode = encodeURI(`Your message is: ${code}`)
  var url = `https://smsc.ru/sys/send.php?login=luvr&psw=hubqaq-3bicru-zAvmav&phones=${phoneNumber}&mes=${encCode}`
  axios.get(url)
    .then((response) => {
      console.log(response)
      res.redirect('/form/code')
    })
})

router.get('/code', (req, res) => {
  res.render('formCode')
})

router.post('/code', (req, res) => {
  const recievedCode = +req.body.code
  const rightCode = +req.session.specialCode

  if (recievedCode === rightCode) {
    Action.create({ number: req.session.actionValue }, (err, action) => {
      if (err) res.json({ databaseError: err })
      console.log(action)
    })
    res.render('success')
  } else {
    res.render('errorCode')
  }
})

module.exports = router

