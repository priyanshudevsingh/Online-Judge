const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputDir = path.join(__dirname, "../outputs");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const executeCode = async (filepath, lang) => {
  let langDir;
  if (lang === "cpp") langDir = path.join(__dirname, "../outputs/cpp");
  else if (lang === "java") langDir = path.join(__dirname, "../outputs/java");
  else if (lang === "py") langDir = path.join(__dirname, "../outputs/py");

  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }

  const fileName = path.basename(filepath).split(".")[0];
  const outPath = path.join(langDir, `${fileName}.exe`);
  console.log(outPath);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outPath} && cd ${langDir} && .\\${fileName}.exe`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};

module.exports = executeCode;
