const axios = require("axios").default;

function sendSMS(phoneNumber, encCode, res) {
  var url = `https://smsc.ru/sys/send.php?login=luvr&psw=hubqaq-3bicru-zAvmav&phones=${phoneNumber}&mes=${encCode}`;
  axios
    .get(url)
    .then((response) => {
      res.status(200).send({});
    })
    .catch((err) => {
      res.status(500).send({ sendingError: err });
    });
}

module.exports = sendSMS;
