# dark-mode-native-rendering Specification

## Purpose
TBD - created by archiving change fix-issue-2-dark-mode-syntax. Update Purpose after archive.
## Requirements
### Requirement: 深色模式必须稳定渲染原生警示块
Bloom 深色主题 MUST 同时对 Typora `blockquote[data-type="alert-*"]` 与 GitHub 兼容 `.md-alert-*` 结构应用一致的间距、标题样式、强调边和可读对比度。

#### Scenario: 渲染 Typora 警示语法
- **WHEN** 文档在 Bloom 深色主题中包含 `[!NOTE]`、`[!TIP]`、`[!WARNING]`、`[!IMPORTANT]` 或 `[!CAUTION]` 块
- **THEN** 渲染后的 alert 区块使用深色兼容的背景/边框颜色，并保持标题和正文可读

#### Scenario: 渲染 GitHub 兼容 alert DOM 类名
- **WHEN** Typora 或粘贴内容产生 `.md-alert-*` 容器且使用 Bloom 深色主题
- **THEN** 该 alert 的语义色和结构样式与等价的 `blockquote[data-type="alert-*"]` 区块保持一致

### Requirement: 深色模式必须保证 Mermaid 图表可读性
Bloom 深色主题 MUST 对 Mermaid 渲染的 SVG 内容应用语义文本色与连线色，确保标签、节点、边和箭头在深色背景下可读。

#### Scenario: 深色模式下 Mermaid 文本对比度
- **WHEN** 任一 Bloom 深色主题渲染 Mermaid 图表
- **THEN** 标签与消息文本使用主题文本语义 token，并保持可读对比度

#### Scenario: 深色模式下 Mermaid 边和节点可见性
- **WHEN** 任一 Bloom 深色主题显示 Mermaid 节点与连线路径
- **THEN** 节点填充/描边及边/箭头颜色映射到深色语义 token，且视觉可区分

### Requirement: 深色 root 主题必须定义必需的标题栏语义变量
每个 Bloom 深色 root 主题文件 MUST 定义 `--title-bar-bg` 与 `--title-bar-text`，以便共享布局样式可解析一致的深色标题栏配色。

#### Scenario: 深色变体变量完整性
- **WHEN** 加载任一 `theme-src/root-*-dark.css` 文件
- **THEN** `--title-bar-bg` 与 `--title-bar-text` 都存在，并映射到合适的深色语义 token

### Requirement: 深色模式不得覆盖带 class 的嵌入 HTML 节点颜色
深色兼容规则 MUST 仅让无 class 的嵌入 `span`/`div` 继承文本颜色，且 MUST 避免宽泛覆盖导致 class 组件样式被改变。

#### Scenario: 无 class 的嵌入 HTML 继承可读文本色
- **WHEN** Markdown 在 Bloom 深色主题中包含无 class 的嵌入 `span` 或 `div`
- **THEN** 这些节点继承当前文本色并保持可读

#### Scenario: 带 class 的嵌入 HTML 保持组件样式
- **WHEN** 嵌入 HTML 元素带有 class 属性且使用 Bloom 深色主题
- **THEN** 深色兼容规则不会覆盖该 class 对应组件的颜色定义

