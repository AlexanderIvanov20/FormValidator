const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");

const doc = new PDFDocument();

doc.pipe(
  fs.createWriteStream(
    path.join(__dirname, "../", "public", "pdfs", "some.pdf")
  )
);

doc.polygon([33, 0], [33, 80], [580, 80], [580, 0]).fillAndStroke("#f0c20f");

doc.image(path.join(__dirname, "../", "public", "images", "logo.png"), 75, 20, {
  scale: 0.35,
});

doc.lineCap("butt").moveTo(75, 160).lineTo(535, 160).fillAndStroke("#7b777d");
doc.lineCap("butt").moveTo(75, 715).lineTo(535, 715).fillAndStroke("#7b777d");

doc.fillColor("#000000").fontSize(18).text("Dear Entony Hopkins", 75, 120);
doc
  .fillColor("#000000")
  .fontSize(12)
  .text("I passed interview at 21.07.2020 in the evening", 75, 180);

doc.end();
