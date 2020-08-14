const express = require("express");
const Action = require("../models/Action");
const axios = require("axios").default;
const sendSMS = require("../services/send");
const PDFGenerator = require("../services/pdf");
const fs = require("fs");

const router = express.Router();

var data = {};

router.get("/", (req, res) => {
  res.render("form");
});

router.post("/", (req, res) => {
  Object.assign(data, req.body);
});

router.post("/phone", (req, res) => {
  const phoneNumber = req.body.phone;

  const code = Math.floor(Math.random() * (1000000 - 100000)) + 100000;
  data.rightCode = code;
  console.log(code);

  var encCode = encodeURI(`Your message is: ${code}`);
  // res.status(200).send({});
  sendSMS(phoneNumber, encCode, res);
});

router.post("/code", (req, res) => {
  const recievedCode = +req.body.code;
  const rightCode = +data.rightCode;
  if (recievedCode === rightCode) {
    const baseNumber = JSON.parse(fs.readFileSync("options.json", "utf8"))
      .baseNumber;
    const date = new Date();
    const jsonOptions = JSON.parse(fs.readFileSync("options.json", "utf8"));

    data.date = date;
    data.baseNumber = baseNumber;
    data.headerColor = jsonOptions.headerColor;
    data.logo = jsonOptions.logo;

    const randomName = `pdf_${Math.floor(
      Math.random() * Math.floor(100000000000)
    )}.pdf`;
    const pdf = new PDFGenerator(randomName, data);

    const downloadUrl = pdf.downloadPath;
    Action.create(
      {
        number: +data.actionvalue,
        name: data.name,
        surname: data.surname,
        date,
        downloadUrl,
      },
      (err, action) => {
        if (err) res.json({ databaseError: err });
      }
    );
    res.status(200).send({ msg: "Action allowed!" });
  } else {
    res.status(503).send({ msg: "Incorrect code..." });
  }
});

module.exports = router;
