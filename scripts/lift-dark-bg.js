const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'theme-src');
const allThemes = require('./theme-list');

const darkThemes = allThemes
    .filter(t => t.hue !== undefined && t.vars)
    .map(t => ({ file: t.vars, hue: t.hue }));

// 新的亮度标准
const BG_L = 28;
const SURFACE_L = 34;
const SURFACE_2_L = 40;

darkThemes.forEach(theme => {
    const filePath = path.join(srcDir, theme.file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // 使用正则替换背景和层级颜色
    // 匹配如 --bg: oklch(18% 0.02 160);
    content = content.replace(
        /--bg: oklch\(\d+% 0.02 \d+\);/g, 
        `--bg: oklch(${BG_L}% 0.02 ${theme.hue});`
    );

    content = content.replace(
        /--surface: oklch\(\d+% 0.0[23] \d+\);/g, 
        `--surface: oklch(${SURFACE_L}% 0.02 ${theme.hue});`
    );

    content = content.replace(
        /--surface-2: oklch\(\d+% 0.0[234] \d+\);/g, 
        `--surface-2: oklch(${SURFACE_2_L}% 0.02 ${theme.hue});`
    );

    // 同时稍微提亮代码块背景，避免在浅色背景上显得太突兀
    // 之前是 14%，现在提升到 24%
    content = content.replace(
        /--code-bg: oklch\(\d+% 0.0[12] \d+\);/g,
        `--code-bg: oklch(24% 0.02 ${theme.hue});`
    );

    fs.writeFileSync(filePath, content);
    console.log(`Updated backgrounds for ${theme.file}`);
});
