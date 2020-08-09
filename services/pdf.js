const { degrees, PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");

(async () => {
  const pdfDoc = await PDFDocument.load(
    fs.readFileSync(__dirname + "/init.pdf")
  );

  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  firstPage.drawText("This text was added with JavaScript!", {
    x: 400,
    y: 700,
    size: 28,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync("some.pdf", pdfBytes);
})();
