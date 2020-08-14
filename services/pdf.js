const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");
const moment = require("moment");

class PDFGenerator {
  constructor(name, options) {
    const doc = new PDFDocument({ size: [595, 842], margin: 0 });
    this.path = path.join(__dirname, "../", "public", "pdfs", name);
    this.downloadPath = `${name}`;

    doc.pipe(fs.createWriteStream(this.path));
    this.doc = doc;
    this.options = options;

    this.drawAndWrite();

    this.doc.end();
  }

  drawAndWrite() {
    this.doc
      .polygon([22, 0], [22, 70], [573, 70], [573, 0])
      .fillAndStroke(this.options.headerColor);

    this.doc.image(
      path.join(__dirname, "../", "public", "images", this.options.logo),
      52,
      16,
      {
        width: 93.91,
        height: 37.64,
      }
    );

    this.doc
      .lineCap("butt")
      .moveTo(52, 141)
      .lineTo(543, 141)
      .fillAndStroke("#A3A3A3");
    this.doc
      .lineCap("butt")
      .moveTo(52, 767)
      .lineTo(543, 767)
      .fillAndStroke("#A3A3A3");

    this.doc.font("fonts/Montserrat-Regular.ttf");
    this.doc.fillColor("#000000");
    this.doc.fontSize(21).text(`${this.options.s4}`, 52, 100);

    this.doc.fontSize(12);
    this.doc.text(
      `${this.options.s5} ${moment(this.options.date).format("DD.MM.YYYY")} ${
        this.options.s6
      }\n${this.options.s7} ${this.options.rightCode}`,
      52,
      161
    );
    this.doc.text(`${this.options.s24}`, 52, 637);
    this.doc.text(
      `${this.options.s27} ${moment(this.options.date).format("DD MMM YYYY")} ${
        this.options.s28
      } ${moment(this.options.date).format("HH:mm")}`,
      52,
      797
    );

    this.doc.font("fonts/Montserrat-Bold.ttf");
    this.doc.text(`${this.options.s25}\n\n${this.options.s26}`, 52, 685);

    this.doc.fillColor("#646464").font("fonts/Montserrat-Regular.ttf");
    this.doc.text(`${this.options.s1}`, 313, 18);
    this.doc.text(`${this.options.s3}`, 313, 37);
    this.doc.text(`${this.options.s2}`, 515, 18);

    this.doc.fontSize(14).fillColor("#000000");
    this.doc.font("fonts/Montserrat-Bold.ttf");
    this.doc.text(`${this.options.s8}`, 52, 229);
    this.doc.text(`${this.options.s12}`, 52, 327);
    this.doc.text(`${this.options.s17}`, 52, 457);
    this.doc.text(`${this.options.s21}`, 52, 555);

    this.doc.font("fonts/Montserrat-Regular.ttf");
    this.doc.text(`${this.options.s9}`, 52, 265);
    this.doc.text(
      `${this.options.baseNumber} ${this.options.s10}\n${this.options.s11}`,
      313,
      265
    );
    this.doc.text(
      `${this.options.s13}:\n${this.options.s14}:\n${this.options.s15}:\n${this.options.s16}:`,
      52,
      363
    );
    this.doc.text(
      `${this.options.name}\n${this.options.surname}\n${this.options.company}\n${this.options.position}`,
      313,
      363
    );
    this.doc.text(`${this.options.s18}:\n${this.options.s19}:`, 52, 493);
    this.doc.text(
      `${this.options.actionvalue} ${this.options.s20}\n${this.options.title}`,
      313,
      493
    );
    this.doc.text(`${this.options.s22}`, 51, 591);
    this.doc.text(`${this.options.s23}`, 313, 591);
  }
}

module.exports = PDFGenerator;
