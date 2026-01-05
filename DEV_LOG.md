# 开发日志 (DEV_LOG)

## 2026-01-05 配色方案优化

### 问题诊断

#### 1. 致命的对比度隐患 (Accessibility Risk)

**Mist & Stone 的 Accent 问题：**
- 现状：背景 L=96%，Accent L=65%
- 问题：强调色用于文字链接时对比度太低，视力稍弱的用户看不清链接
- 修复：Accent 亮度从 65% 降至 50%

**Cyber 的"蓝光晕影"效应：**
- 现状：背景极黑 (12%)，Accent 是高饱和霓虹蓝 (Chroma 0.18, Hue 245)
- 问题：Chromostereopsis（色立体视觉）导致文字边缘模糊、重影
- 修复：降低 Chroma 0.18 → 0.14，Hue 从 245 调整到 230（偏青）

#### 2. 深色模式的"层级缺失" (Hierarchy Issues)

- 现状：深色系背景亮度统一设为 L=22%
- 问题：L=22% 约等于 #303030，作为全局背景太亮，缺乏深邃感
- 修复：全局背景从 22% 降至 14%

#### 3. Spring 的单色问题 (Monochrome Flatness)

- 现状：背景、文字、强调色全部锁定在 Hue=295
- 问题：用户难以区分装饰、按钮、状态提示
- 保留：暂不修改，保持单色风格设计意图

#### 4. 色域映射风险 (Gamut Mapping)

- Verdant & Forest 使用高饱和绿色，在 sRGB 覆盖率低的屏幕上可能失真
- 保留：暂不修改，后续可增加 fallback 机制

### 修复数值

| 主题 | 变量 | 原值 | 新值 |
|:---|:---|:---|:---|
| Dark | --bg | oklch(22% 0.02 260) | oklch(14% 0.02 260) |
| Forest | --bg | oklch(22% 0.01 160) | oklch(14% 0.01 160) |
| Spring | --bg | oklch(22% 0.02 295) | oklch(14% 0.02 295) |
| Cyber | --accent | oklch(78% 0.18 245) | oklch(75% 0.14 230) |
| Mist | --accent | oklch(65% 0.06 240) | oklch(50% 0.08 240) |
| Stone | --accent | oklch(65% 0.04 40) | oklch(50% 0.06 40) |
| Verdant | --accent | oklch(68% 0.05 160) | oklch(50% 0.07 160) |

### 层级变量更新

深色主题需要更新 `--surface` 以保持与 `--bg` 的层级差：
- `--bg` = 14% → `--surface` = 22%
