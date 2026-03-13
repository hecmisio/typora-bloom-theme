## Why

Issue #2 反馈 Bloom 深色主题下，部分 Typora/GitHub 原生 Markdown 组件渲染异常，导致内容可读性下降或视觉风格不一致。
需要尽快修复该问题，以恢复深色模式的基础可用性，并保证所有深色变体表现一致。

## What Changes

- 为 Typora 原生渲染的 Markdown 区块建立深色模式兼容基线（包括 alerts/callouts、Mermaid 图表、无 class 的嵌入 HTML 文本）。
- 确保所有深色变体都暴露共享深色样式所需的语义变量，保证文本与背景映射一致。
- 定义统一的验收行为，覆盖颜色对比度与选择器覆盖范围，并适用于所有深色变体。

## Capabilities

### New Capabilities
- `dark-mode-native-rendering`：保证 Bloom 深色主题下 Typora/GitHub 原生 Markdown 组件渲染可读且一致。

### Modified Capabilities
- 无。

## Impact

- 影响源码文件：`theme-src/base-dark.css`、`theme-src/base-light.css`（共享兼容规则）以及所有 `theme-src/root-*-dark.css` 变量定义文件。
- 上述 CSS 源码对应的构建产物会在所有深色主题变体中发生变化。
- 不涉及外部 API 或依赖变更。