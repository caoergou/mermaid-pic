# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

纯客户端的 Mermaid 图表编辑器，支持实时预览。无构建步骤、无包管理器、无框架，静态文件直接运行。通过 `.github/workflows/deploy.yml` 在推送到 `main` 分支时自动部署到 GitHub Pages。

## 架构

应用由 `index.html`、`style.css`、入口 `app.js` 和 `modules/` 目录下的模块组成，使用原生 ES 模块（无构建步骤）。

### 入口文件

- `index.html` — 页面布局、工具栏、编辑器/预览面板、帮助弹窗、引导遮罩层。所有依赖通过 CDN（esm.sh）加载。
- `app.js` — 主入口，负责启动引导（bootstrap）和 UI 事件绑定。
- `style.css` — 使用 CSS 变量管理主题，通过 `[data-theme="dark"]` 切换深色模式，响应式断点为 768px。

### 模块 (`modules/`)

| 文件 | 职责 |
|------|------|
| `core.js` | 共享状态（`state`）、DOM 引用（`dom`）、常量、工具函数（toast、zoom、theme 切换等） |
| `i18n.js` | 国际化字符串（`STRINGS`）、`applyI18n()` |
| `examples.js` | 示例图表数据（`EXAMPLES`）、默认代码（`DEFAULT_CODE`） |
| `editor.js` | CodeMirror 6 编辑器初始化、`getCode()`、lint 诊断管理 |
| `render.js` | Mermaid 初始化/渲染（`initMermaid`、`renderDiagram`）、字体内联、SVG→PNG 转换 |
| `export.js` | 复制/下载 SVG/PNG、URL 编码（pako 压缩）、分享链接、嵌入代码 |
| `tour.js` | 交互式引导教程 |
| `command-palette.js` | 命令面板（Ctrl+K） |

### 依赖关系（无循环引用）

```
core.js ← (无依赖)
i18n.js ← core
examples.js ← (无依赖)
editor.js ← core
render.js ← core, i18n, editor
export.js ← core, i18n, editor, render
tour.js ← core, i18n
command-palette.js ← core, i18n, examples, render, export
app.js ← 所有模块
```

## 依赖（仅 CDN）

- Mermaid 11 — 图表渲染
- CodeMirror 6 — 编辑器，配合 `codemirror-lang-mermaid` 和 `@codemirror/theme-one-dark`
- Caveat 字体 — 手绘风格模式

## 关键行为

- 输入后 300ms 防抖渲染，也可通过 `Ctrl+Enter` 手动触发
- PNG 导出通过 canvas 以 2 倍分辨率缩放
- 主题状态（UI 主题、Mermaid 主题、手绘模式）以 `modules/core.js` 中的 `state` 对象集中管理
- 引导教程通过 `tourActive` 标志和步骤索引追踪状态

## 开发

直接在浏览器中打开 `index.html`，或用任意静态文件服务器：

```
python3 -m http.server
```

无构建、lint 或测试命令。
