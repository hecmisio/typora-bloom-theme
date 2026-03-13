## Context

Bloom 目前有多个深色变体，共享基础样式规则。Issue #2 表明在深色模式下，Typora/GitHub 原生 Markdown 组件（尤其是 alerts/callouts、Mermaid SVG 文本/连线、以及普通嵌入 HTML 节点）会出现对比度不足或未使用主题语义色的问题。修复方案必须在 8 个深色变体中稳定生效，并避免按主题分叉 CSS。

## Goals / Non-Goals

**Goals:**
- 为深色模式下的原生 Markdown 组件渲染定义统一兼容基线。
- 统一每个深色 root 主题所需的语义变量，保证共享深色样式可稳定渲染。
- 在全部现有深色变体中保持行为一致，并尽量减少主题特化覆盖。

**Non-Goals:**
- 不重设计 Bloom 的配色或字体体系。
- 不引入 issue 范围外的新 Markdown 功能。
- 不修改外部构建工具链，也不新增运行时依赖。

## Decisions

- 在 `base-dark.css` 使用共享选择器，同时覆盖 Typora 生成的 alert DOM 与 GitHub 风格 alert DOM。
  - Rationale: 单一路径可减少样式漂移，并确保两类标记结构都被覆盖。
  - Alternative considered: 在每个 `root-*-dark.css` 中分别写 alert 规则；因重复高、维护成本大而放弃。
- 通过语义变量驱动 Mermaid 的 fill/stroke 映射，强制保证深色可读性。
  - Rationale: Mermaid 输出是 SVG，深色背景下必须显式映射文本和连线颜色。
  - Alternative considered: 保持 Mermaid 默认样式；因与 Bloom 深色调色板不一致而放弃。
- 要求每个深色 root 主题必须定义 `--title-bar-bg` 与 `--title-bar-text`。
  - Rationale: 共享窗口栏样式依赖这些变量；缺失会造成标题栏对比度不一致。
  - Alternative considered: 依赖全局兜底变量；因可能导致局部主题对比异常而放弃。
- 对 light 模式仅做与共享 alert 选择器相关的最小兼容改动。
  - Rationale: 本次目标是深色模式问题，light 模式仅做必要的结构对齐。

## Risks / Trade-offs

- [选择器覆盖过宽] 扩展到原生 HTML 节点后可能影响自定义嵌入块 -> Mitigation: 仅作用于 `#write` 下无 class 的元素，并用代表性文档验证。
- [变体之间视觉漂移] 语义 token 调整在不同深色调色板上可能观感略有差异 -> Mitigation: 使用 `--text`、`--surface`、`--muted` 等语义变量，避免硬编码颜色。
- [既有 alert 视觉回归] alert 结构更新可能改变间距/图标表现 -> Mitigation: 增加标题、图标、左侧强调边和对比度的验收检查。