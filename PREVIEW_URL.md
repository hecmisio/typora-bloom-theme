# 预览地址 (Preview URLs)

此文件用于记录项目预览地址，方便快速复现问题和验证修复 (Issue Reproduction)。

## 🌏 线上环境 (Production)
- **首页**: [https://typora-bloom-theme.webkubor.online/](https://typora-bloom-theme.webkubor.online/)
- **实时预览 (Showcase)**: [https://typora-bloom-theme.webkubor.online/showcase.html](https://typora-bloom-theme.webkubor.online/showcase.html)
  > **用途**: 验证 Mermaid 图表、代码高亮、字体渲染等在线上环境的表现。

## 💻 本地环境 (Local)
运行以下命令启动本地服务器：
```bash
npm run dev
# 或
pnpm dev
```
- **Localhost**: [http://127.0.0.1:5173/](http://127.0.0.1:5173/)
- **Local Showcase**: [http://127.0.0.1:5173/showcase.html](http://127.0.0.1:5173/showcase.html)

## 🐞 常见问题复现 (Troubleshooting)
- **Mermaid 样式**: 请在 `showcase.html` 中切换不同主题 (如 Mist Dark) 查看图表清晰度。
- **资源丢失**: 检查 Console 是否有 404 错误 (如 favicon, scripts)。
