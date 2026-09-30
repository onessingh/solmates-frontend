
const fs = require("fs");
const path = require("path");
const dir = "c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend";
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const fp = path.join(d, f);
    if (fs.statSync(fp).isDirectory()) walk(fp);
    else if (fp.endsWith(".html") || fp.endsWith("sw.js")) {
      let c = fs.readFileSync(fp, "utf-8");
      if (c.includes("v792")) {
        c = c.replace(/v792/g, "v793");
        fs.writeFileSync(fp, c);
      }
    }
  }
}
walk(dir);
console.log("Bumped to v793!");

