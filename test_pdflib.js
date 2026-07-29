
const { PDFDocument } = require("pdf-lib");
async function test() {
  const doc = await PDFDocument.create();
  console.log("embedPdf:", typeof doc.embedPdf);
  console.log("embedPages:", typeof doc.embedPages);
  console.log("embedPage:", typeof doc.embedPage);
}
test();

