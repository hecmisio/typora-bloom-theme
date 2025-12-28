const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "theme-src");
const distDir = path.join(root, "dist");

const themes = [
  { name: "light", base: "base-light.css", vars: "root-light.css" },
  { name: "dark", base: "base-dark.css", vars: "root-dark.css" },
  { name: "forest", base: "base-dark.css", vars: "root-forest.css" },
  { name: "cyber", base: "base-dark.css", vars: "root-cyber.css" },
  { name: "spring", base: "base-dark.css", vars: "root-spring.css" },
  { name: "mist", base: "base-light.css", vars: "root-mist.css" },
  { name: "verdant", base: "base-light.css", vars: "root-verdant.css" },
  { name: "stone", base: "base-light.css", vars: "root-stone.css" }
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
