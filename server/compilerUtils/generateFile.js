const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const codeDir = path.join(__dirname, "../codes");

if (!fs.existsSync(codeDir)) {
  fs.mkdirSync(codeDir, { recursive: true });
}

const generateFile = async (lang, code) => {
  let langDir;
  if (lang === "cpp") langDir = path.join(__dirname, "../codes/cpp");
  else if (lang === "java") langDir = path.join(__dirname, "../codes/java");
  else if (lang === "py") langDir = path.join(__dirname, "../codes/py");

  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }
  const codeId = uuid();

  const fileName = `${codeId}.${lang}`;
  const filePath = path.join(langDir, fileName);
  await fs.writeFileSync(filePath, code);
  return filePath;
};

module.exports = generateFile;
