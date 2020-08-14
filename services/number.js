const fs = require("fs");

function updateBaseNumber(newBaseNumber) {
  const readedData = JSON.parse(fs.readFileSync("options.json", "utf-8"));
  readedData.baseNumber = newBaseNumber;
  const dataToWrite = JSON.stringify(readedData, null, 2);
  fs.writeFileSync("options.json", dataToWrite, "utf8");
}

module.exports = updateBaseNumber;
