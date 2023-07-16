const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputDir = path.join(__dirname, "../outputs");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const executeCode = async (filepath, lang, input, type) => {
  const fileName = path.basename(filepath).split(".")[0];

  // making output directory
  let langoutDir;
  if (lang === "cpp") langoutDir = path.join(__dirname, "../outputs/cpp");
  else if (lang === "java")
    langoutDir = path.join(__dirname, "../outputs/java");
  else if (lang === "py") langoutDir = path.join(__dirname, "../outputs/py");

  if (!fs.existsSync(langoutDir)) {
    fs.mkdirSync(langoutDir, { recursive: true });
  }
  const outPath = path.join(langoutDir, `${fileName}.exe`);
  console.log(outPath);

  // making input directory
  let langinDir;
  if (lang === "cpp") langinDir = path.join(__dirname, "../inputs/cpp");
  else if (lang === "java") langinDir = path.join(__dirname, "../inputs/java");
  else if (lang === "py") langinDir = path.join(__dirname, "../inputs/py");

  if (!fs.existsSync(langinDir)) {
    fs.mkdirSync(langinDir, { recursive: true });
  }
  const inPath = path.join(langinDir, `${fileName}.txt`);
  console.log(inPath);
  await fs.writeFileSync(inPath, input);

  // commands for diff lang
  const commands = {
    cpp: [`g++ ${filepath} -o ${outPath} && cd ${langoutDir} && ./${fileName}.exe < ${inPath}`],
    java: [`javac -d ${langoutDir} ${filepath} && cd ${langoutDir} && java ${fileName} < ${inPath}`],
    py: [`python ${filepath} < ${inPath}`],
  };

  return new Promise((resolve, reject) => {
    if (type === "run") {
      console.log("running");

      exec(commands[lang][0], (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
    } else {
      console.log("submitting");

      exec(commands[lang][0], (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
      // will add other functionality later
    }
  });
};

module.exports = executeCode;
