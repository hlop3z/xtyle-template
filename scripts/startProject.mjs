import AdmZip from "adm-zip";
import fs from "fs";

if (process.argv.length < 3) {
  console.error("Usage: npm run start:app <workspace-name>");
  process.exit(1);
}

const projectName = process.argv[2];
const sourceFilePath = "./core/base.zip";
const destinationFolder = `./packages/${projectName}`;

// Create the destination folder if it doesn't exist
if (!fs.existsSync(destinationFolder)) {
  fs.mkdirSync(destinationFolder, { recursive: true });
}

// Create an instance of AdmZip
const zip = new AdmZip(sourceFilePath);

// Extract the contents to the destination folder
zip.extractAllTo(destinationFolder, /* overwrite */ true);

console.log(`Created Package { ${projectName} } Successfully!`);
