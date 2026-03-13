## 1. 基线样式更新

- [x] 1.1 更新 `theme-src/base-dark.css` 选择器，使 alert 样式同时覆盖 `blockquote[data-type="alert-*"]` 与 `.md-alert-*` 结构。
- [x] 1.2 在 `theme-src/base-light.css` 中按需同步 alert 兼容选择器模式，保持标记结构一致性。
- [x] 1.3 新增或调整深色模式嵌入 HTML 继承规则，仅作用于无 class 的 `span`/`div`。

## 2. Mermaid 深色可读性

- [x] 2.1 在 `theme-src/base-dark.css` 为 Mermaid 标签与消息文本增加基于语义 token 的颜色规则。
- [x] 2.2 在 `theme-src/base-dark.css` 为 Mermaid 节点/连线/箭头增加基于语义 token 的样式规则，保证深色背景下结构可读。
- [x] 2.3 验证 Mermaid 规则使用 `--text`、`--surface`、`--muted`、`--accent` 等语义变量，而非硬编码颜色。

## 3. 深色变体语义变量补齐

- [x] 3.1 在每个 `theme-src/root-*-dark.css` 文件中补充 `--title-bar-bg` 与 `--title-bar-text` 定义。
- [x] 3.2 确认各深色 root 文件中的标题栏变量映射到有效深色语义 token，且不破坏现有变量声明。

## 4. 验证与回归检查

- [x] 4.1 构建主题产物并确认 CSS 无畸形声明或编译错误。
- [x] 4.2 在至少一个代表性深色主题中验证 NOTE/TIP/WARNING/IMPORTANT/CAUTION 的 alert 渲染。
- [x] 4.3 在至少一个代表性深色主题中验证 Mermaid 文本/连线/节点可读性。
- [x] 4.4 验证带 class 的嵌入 HTML 组件样式不变，同时无 class 的 `span`/`div` 可继承可读文本色。