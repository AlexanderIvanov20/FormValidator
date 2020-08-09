const axios = require("axios").default;

function sendSMS(phoneNumber, encCode, res) {
  var url = `https://smsc.ru/sys/send.php?login=luvr&psw=hubqaq-3bicru-zAvmav&phones=${phoneNumber}&mes=${encCode}`;
  axios
    .get(url)
    .then((response) => {
      console.log(response);
      res.status(200).send({ rightCode: code });
    })
    .catch((err) => {
      res.json({ sendingError: err });
    });
}

module.exports = sendSMS;
