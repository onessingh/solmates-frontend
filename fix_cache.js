
const fs = require("fs");
const path = require("path");
const dir = "c:/Users/Toshiba/OneDrive/Desktop/solmates/frontend/database";
const files = fs.readdirSync(dir).filter(f => f.endsWith(".html"));
for (const f of files) {
  const fp = path.join(dir, f);
  let c = fs.readFileSync(fp, "utf-8");
  
  // Fix getSOLFolders
  c = c.replace(/getSOLFolders\(([^,]+),\s*([^,]+),\s*([^,]+),\s*true\)/g, "getSOLFolders($1, $2, $3, false)");
  c = c.replace(/getSOLFolders\(([^,]+),\s*([^,]+),\s*([^,]+),\s*true,\s*true\)/g, "getSOLFolders($1, $2, $3, false, true)");
  
  // Fix getSOLContent
  c = c.replace(/getSOLContent\(([^,]+),\s*([^,]+),\s*([^,]+),\s*true\)/g, "getSOLContent($1, $2, $3, false)");
  
  // Special fix for the one in `init()` that I manually replaced via replace_file_content but was reverted
  // Wait, the regex above will catch it!
  
  fs.writeFileSync(fp, c);
}
console.log("Done!");

