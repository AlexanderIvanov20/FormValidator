const express = require("express");
const router = express.Router();

var data = {};

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  const phoneNumber = req.body.phone;

  const code = Math.floor(Math.random() * (1000000 - 100000)) + 100000;
  data.rightCodeLogin = +code;
  console.log(code);

  var encCode = encodeURI(`Your message is: ${code}`);
  // res.status(200).send({ rightCode: code });
  sendSMS(phoneNumber, encCode, res);
});

router.post("/code", (req, res) => {
  const recievedCode = +req.body.code;
  const rightCode = +data.rightCodeLogin;
  if (recievedCode === rightCode) {
    res.status(200).send({ msg: "Logined successfully!" });
  } else {
    res.status(503).send({ msg: "Incorrect code..." });
  }
});

module.exports = router;
