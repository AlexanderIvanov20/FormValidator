const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

(async () => {
  const doc = await PDFDocument.create();

  const page = doc.addPage();

  doc.registerFontkit(path.join(__dirname, "../", "/Montserrat-Regular.ttf"));

  page.drawText("This text was added with JavaScript!", {
    x: 400,
    y: 700,
    size: 28,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await doc.save();
  fs.writeFileSync("public/pdfs/some.pdf", pdfBytes);
})();
