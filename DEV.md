## 开发说明

### 目录结构
- `theme-src/`：主题源文件（base + root）
- `dist/`：构建生成的主题文件（发布产物）
- `bloom/`：主题包内资源（仅主题所需，如字体）
- `assets/`：站点/内部资源（不进主题包）
- `index.html` / `editor.html` / `showcase.html`：站点预览页面（从 `dist/` 加载主题）

### 脚本说明
- `npm run build`：生成 `dist/bloom-*.css`
- `npm run preview`：先构建，再启动本地预览
- `npm run package`：构建并生成 `Bloom-theme.zip`
- `npm run release`：打包 + 提交 + 打 tag + 推送

### 发布流程
1. 修改 `VERSION.txt`
2. 执行 `npm run release`

注意：
- `release` 会执行 `git add -A`，确认要提交的改动已准备好。
- `package` 依赖系统已安装 `zip` 命令。
