const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'theme-src');
const allThemes = require('./theme-list');

const darkThemes = allThemes
    .filter(t => t.hue !== undefined && t.vars)
    .map(t => ({ file: t.vars, hue: t.hue }));

// 深度变量亮度
const DEPTH_1_L = 30; // 顶部稍亮
const DEPTH_2_L = 28; // 底部基准

darkThemes.forEach(theme => {
    const filePath = path.join(srcDir, theme.file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // 检查是否已存在，避免重复添加
    if (!content.includes('--page-depth-1')) {
        // 在 --bg 定义之前插入这两个变量
        const depthVars = `
    /* Page Depth Gradient */
    --page-depth-1: oklch(${DEPTH_1_L}% 0.02 ${theme.hue});
    --page-depth-2: oklch(${DEPTH_2_L}% 0.02 ${theme.hue});
`;
        // 找到插入点 (在 --bg 之前)
        content = content.replace(/(\s+--bg:)/, `${depthVars}$1`);
        
        fs.writeFileSync(filePath, content);
        console.log(`Added depth variables to ${theme.file}`);
    } else {
        console.log(`Depth variables already exist in ${theme.file}`);
    }
});
