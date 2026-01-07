const fs = require('fs');
const path = require('path');
const themes = require('./theme-list');

const root = path.resolve(__dirname, '..');
const assetsDir = path.join(root, 'assets');

// 生成 site.js 需要的配置对象
const themeConfig = {};
themes.forEach(theme => {
    themeConfig[theme.name] = {
        name: theme.label, // site.js 使用 name, theme-list 使用 label
        accent: theme.accent,
        bg: theme.bg,
        text: theme.text,
        hue: theme.hue
    };
});

const fileContent = `// Auto-generated from scripts/theme-list.js
window.THEME_CONFIG = ${JSON.stringify(themeConfig, null, 2)};
`;

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir);
}

fs.writeFileSync(path.join(assetsDir, 'theme-data.js'), fileContent);
console.log('Successfully generated assets/theme-data.js');
