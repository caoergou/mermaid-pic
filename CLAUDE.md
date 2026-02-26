# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

纯客户端的 Mermaid 图表编辑器，支持实时预览。无构建步骤、无包管理器、无框架，静态文件直接运行。通过 `.github/workflows/deploy.yml` 在推送到 `main` 分支时自动部署到 GitHub Pages。

## 架构

整个应用由三个文件构成：

- `index.html` — 页面布局、工具栏、编辑器/预览面板、帮助弹窗、引导遮罩层。所有依赖通过 CDN（esm.sh）加载。
- `app.js` — 全部应用逻辑，使用 ES 模块。核心函数：`renderDiagram()`、`createEditor()`、导出函数（`copySvg`、`copyPng`、`downloadSvg`、`downloadPng`）。
- `style.css` — 使用 CSS 变量管理主题，通过 `[data-theme="dark"]` 切换深色模式，响应式断点为 768px。

## 依赖（仅 CDN）

- Mermaid 11 — 图表渲染
- CodeMirror 6 — 编辑器，配合 `codemirror-lang-mermaid` 和 `@codemirror/theme-one-dark`
- Caveat 字体 — 手绘风格模式

## 关键行为

- 输入后 300ms 防抖渲染，也可通过 `Ctrl+Enter` 手动触发
- PNG 导出通过 canvas 以 2 倍分辨率缩放
- 主题状态（UI 主题、Mermaid 主题、手绘模式）以模块级变量存储在 `app.js` 中
- 引导教程通过 `tourActive` 标志和步骤索引追踪状态

## 开发

直接在浏览器中打开 `index.html`，或用任意静态文件服务器：

```
python3 -m http.server
```

无构建、lint 或测试命令。
