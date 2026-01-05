const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const zipName = "Bloom-theme.zip";
const zipPath = path.join(root, zipName);
const distDir = path.join(root, "dist");
const files = [
  "bloom-petal.css",
  "bloom-petal-dark.css",
  "bloom-verdant-dark.css",
  "bloom-cyber.css",
  "bloom-spring.css",
  "bloom-mist.css",
  "bloom-verdant.css",
  "bloom-stone.css",
  "bloom-amber.css",
  "bloom-amber-dark.css",
].map((file) => path.join(distDir, file));
if (fs.existsSync(path.join(root, "bloom"))) {
  files.push("bloom");
}

function run(cmd) {
  execSync(cmd, { stdio: "inherit", cwd: root, shell: "/bin/bash" });
}

try {
  execSync("command -v zip", { stdio: "ignore", shell: "/bin/bash" });
} catch {
  console.error("未找到 zip 命令，请先安装 zip。");
  process.exit(1);
}

console.log("开始生成本地包...");
run("node scripts/build-themes.js");
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

const cssFiles = files.filter((file) => file.endsWith(".css"));
const assetDirs = files.filter((file) => !file.endsWith(".css"));
const cssArgs = cssFiles.map((file) => `"${file}"`).join(" ");
run(`zip -j "${zipName}" ${cssArgs} >/dev/null`);
assetDirs.forEach((dir) => {
  run(`zip -r "${zipName}" "${dir}" -x "**/.DS_Store" "**/Thumbs.db" >/dev/null`);
});
console.log(`已生成 ${zipName}`);
