const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "theme-src");
const distDir = path.join(root, "dist");

const themes = [
  { name: "petal", base: "base-light.css", vars: "root-petal.css" },
  { name: "petal-dark", base: "base-dark.css", vars: "root-petal-dark.css" },
  { name: "verdant-dark", base: "base-dark.css", vars: "root-verdant-dark.css" },
  { name: "spring", base: "base-light.css", vars: "root-spring.css" },
  { name: "spring-dark", base: "base-dark.css", vars: "root-spring-dark.css" },
  { name: "mist", base: "base-light.css", vars: "root-mist.css" },
  { name: "mist-dark", base: "base-dark.css", vars: "root-mist-dark.css" },
  { name: "verdant", base: "base-light.css", vars: "root-verdant.css" },
  { name: "stone", base: "base-light.css", vars: "root-stone.css" },
  { name: "stone-dark", base: "base-dark.css", vars: "root-stone-dark.css" },
  { name: "amber", base: "base-light.css", vars: "root-amber.css" },
  { name: "amber-dark", base: "base-dark.css", vars: "root-amber-dark.css" }
];

function readSrc(file) {
  const filePath = path.join(srcDir, file);
  return fs.readFileSync(filePath, "utf8");
}

function writeIfChanged(filePath, content) {
  const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
  if (existing === content) return false;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
  return true;
}

let updated = 0;

themes.forEach((theme) => {
  const vars = readSrc(theme.vars).trimEnd();
  const base = readSrc(theme.base).trimStart();
  const output = `${vars}\n\n${base}\n`;
  const outPath = path.join(distDir, `bloom-${theme.name}.css`);
  if (writeIfChanged(outPath, output)) updated += 1;
});

console.log(updated ? `主题已更新：${updated} 个文件` : "主题已是最新");
