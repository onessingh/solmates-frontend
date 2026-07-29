
const { PDFDocument } = require("pdf-lib");
async function test() {
  const doc = await PDFDocument.create();
  
  const src = await PDFDocument.create();
  src.addPage([50, 50]);
  src.addPage([50, 50]);
  src.addPage([50, 50]);
  const bytes = await src.save();
  
  const srcDoc = await PDFDocument.load(bytes);
  const indices = srcDoc.getPageIndices();
  
  const embedded = await doc.embedPdf(bytes, indices);
  console.log("Embedded pages count:", embedded.length);
}
test();

