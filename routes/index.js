const express = require("express");
const Action = require("../models/Action");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  var baseNumber = JSON.parse(fs.readFileSync("options.json", "utf8"))
    .baseNumber;

  Action.findAll({})
    .then((values) => {
      values.forEach((value) => {
        baseNumber -= +value.number;
      });
      values = values.reverse();
      res.render("index", { objects: values, baseNumber });
    })
    .catch((err) => {
      res.json({ databaseError: err });
    });
});

router.get("/deleteActions", (req, res) => {
  const directory = "public/pdfs";
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });

  Action.destroy({ where: {}, truncate: true });
  res.redirect("/");
});

router.get("/setBaseNumber/:valueNumber", (req, res) => {
  const newBaseNumber = +req.params.valueNumber;
  if (isNaN(newBaseNumber)) {
    res.json({ queryError: "Invalid value... enter number!" });
  } else {
    const readedData = JSON.parse(fs.readFileSync("options.json", "utf-8"));
    readedData.baseNumber = newBaseNumber;
    const dataToWrite = JSON.stringify(readedData, null, 2);
    fs.writeFileSync("options.json", dataToWrite, "utf8");
    res.redirect("/");
  }
});

router.get("/download/:name", (req, res) => {
  const fileName = req.params.name;
  const filePath = path.join(__dirname, "../", "public", "pdfs", fileName);
  res.download(filePath);
});

module.exports = router;
