
const { PDFDocument } = require("pdf-lib");
async function test() {
  const doc = await PDFDocument.create();
  const page = doc.addPage([100, 100]);
  const src = await PDFDocument.create();
  src.addPage([50, 50]);
  const bytes = await src.save();
  const [embedded] = await doc.embedPdf(bytes);
  console.log("scaleToFit:", typeof embedded.scaleToFit);
  console.log("scale:", typeof embedded.scale);
}
test();

