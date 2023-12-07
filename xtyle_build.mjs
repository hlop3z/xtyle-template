import fs from "fs";
import path from "path";
import zlib from "zlib";

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
const packageName = pkg.name.replace(/-/g, "_");

/**
 * @Declarations
 */
function componentProps(code) {
  const clean = (code || "any")
    .split("export default Props;")[0]
    .replace("type Props = ", "")
    .trim();
  return clean.endsWith(";") ? clean.slice(0, -1) : clean;
}

function processDeclaration(subfolderPath) {
  const name = path.basename(subfolderPath);
  let props = "";
  let docs = "";

  const propsFilePath = path.join(subfolderPath, "props.tsx");
  const docsFilePath = path.join(subfolderPath, "docs.tsx");

  if (fs.existsSync(propsFilePath)) {
    props = fs.readFileSync(propsFilePath, "utf8");
  }

  if (fs.existsSync(docsFilePath)) {
    docs = fs.readFileSync(docsFilePath, "utf8");
  }

  return `${docs.trim()}\n${name}: (props: ${componentProps(
    props
  )}) => object;`;
}

function getSubfolders(folderPath) {
  return fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function createDeclarations(componentsFolderPath, outputDir) {
  const subfolders = getSubfolders(componentsFolderPath);
  const subfolderObjects = [];

  subfolders.forEach((subfolder) => {
    const subfolderPath = path.join(componentsFolderPath, subfolder);
    const subfolderObject = processDeclaration(subfolderPath);
    subfolderObjects.push(subfolderObject);
  });

  const allDeclarations = subfolderObjects.join("\n\n").trim();
  const declarations = `declare const ${packageName}: {\n${allDeclarations}\n};`;
  fs.writeFileSync(`${outputDir}/index.d.ts`, declarations);
}

/**
 * @GZip
 */
function gzipJsonFiles(filesToInclude, outputFilename) {
  const output = fs.createWriteStream(outputFilename);
  const gzipStream = zlib.createGzip();

  gzipStream.pipe(output);

  const jsonData = {
    name: packageName,
  };

  filesToInclude.forEach((filename) => {
    let content = "";
    try {
      const filePath = `dist/${filename}`;
      if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, "utf8");
      }
    } catch (e) {}
    if (filename === "index.min.js") {
      jsonData["javascript"] = content;
    } else if (filename === "style.css") {
      jsonData["style"] = content;
    } else if (filename === "index.d.ts") {
      jsonData["declarations"] = content;
    }
  });

  const outputString = JSON.stringify(jsonData, null, 4);
  const jsonBuffer = Buffer.from(outputString);

  gzipStream.write(jsonBuffer);
  gzipStream.end();
}

function packageXtylePlugin() {
  // Build Declarations
  const distFolderPath = "./dist";
  const mainFolderPath = "./src/components";
  createDeclarations(mainFolderPath, distFolderPath);

  // Build GZip
  const filesToInclude = ["index.min.js", "index.d.ts", "style.css"];
  const outputFilename = "plugin.json.gz";
  gzipJsonFiles(filesToInclude, `${distFolderPath}/${outputFilename}`);
}

packageXtylePlugin();
