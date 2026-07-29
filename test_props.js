
const { PDFDocument } = require("pdf-lib");
async function test() {
  const doc = await PDFDocument.create();
  const src = await PDFDocument.create();
  src.addPage([50, 60]);
  const bytes = await src.save();
  const [embedded] = await doc.embedPdf(bytes);
  console.log("width:", embedded.width);
  console.log("height:", embedded.height);
}
test();

