const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "_pages");

const copy = (src, dest) => {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
};

const copyDir = (srcDir, destDir) => {
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copy(srcPath, destPath);
    }
  }
};

if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

const websiteDir = path.join(root, "website");

copy(path.join(websiteDir, "index.html"), path.join(outDir, "index.html"));
copy(path.join(websiteDir, "showcase.html"), path.join(outDir, "showcase.html"));
copy(path.join(websiteDir, "site.css"), path.join(outDir, "site.css"));
copy(path.join(websiteDir, "site.js"), path.join(outDir, "site.js"));
copy(path.join(root, "netlify.toml"), path.join(outDir, "netlify.toml")); // netlify.toml stays in root

const distDir = path.join(root, "dist");
if (fs.existsSync(distDir)) {
  copyDir(distDir, path.join(outDir, "dist"));
}

const assetsDir = path.join(root, "bloom");
if (fs.existsSync(assetsDir)) {
  copyDir(assetsDir, path.join(outDir, "bloom"));
}

// Fix: Copy assets directory (images, scripts, etc.)
const staticAssetsDir = path.join(websiteDir, "assets");
if (fs.existsSync(staticAssetsDir)) {
  copyDir(staticAssetsDir, path.join(outDir, "assets"));
}

// Fix: Copy typora.md for showcase preview
const typoraMd = path.join(websiteDir, "typora.md");
if (fs.existsSync(typoraMd)) {
  copy(typoraMd, path.join(outDir, "typora.md"));
}

const screenshotsDir = path.join(root, "screenshots");
if (fs.existsSync(screenshotsDir)) {
  copyDir(screenshotsDir, path.join(outDir, "screenshots"));
}

console.log("已生成 _pages 目录");
