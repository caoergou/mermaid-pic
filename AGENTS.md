# AGENTS.md

This file provides guidance to AI agents (Claude, Cursor, etc.) when working with code in this repository.

## 项目概述

纯客户端的 Mermaid 图表编辑器，支持实时预览。无构建步骤、无包管理器、无框架，静态文件直接运行。通过 `.github/workflows/deploy.yml` 在推送到 `main` 分支时自动部署到 GitHub Pages。

## 架构

应用由 `index.html`、`style.css`、入口 `app.js` 和 `modules/` 目录下的模块组成，使用原生 ES 模块（无构建步骤）。

### 入口文件

- `index.html` — 页面布局、工具栏、编辑器/预览面板、帮助弹窗、引导遮罩层。所有依赖通过 CDN（esm.sh）加载。
- `app.js` — 主入口，负责启动引导（bootstrap）和全局快捷键绑定（`Ctrl+S` 保存对话框、`Ctrl+Shift+C` 复制 PNG、`Ctrl+Shift+F` 格式化、`Alt+1~4` 切换背景）。
- `style.css` — 使用 CSS 变量管理主题，通过 `[data-theme="dark"]` 切换深色模式，响应式断点为 768px。
- `embed.html` — 嵌入模式页面，仅显示图表预览，不含编辑器。

### 模块 (`modules/`)

| 文件 | 职责 |
|------|------|
| `store.js` | 全局状态（`state`）、平移缩放状态（`pz`）、手绘字体配置（`HAND_FONTS`）、常量（`MIN_SCALE`、`MAX_SCALE`）、手绘偏好读写（`saveHandDrawnPrefs`）、字体辅助函数 |
| `dom.js` | 集中管理所有 DOM 元素引用（`dom` 对象） |
| `utils.js` | 通用工具函数：`showToast`、`updateEditorStatus`、`setRenderStatus`、`btnSuccess`、`downloadFile`、`openHelp`、`closeHelp`、`escapeHtml` |
| `i18n.js` | 国际化字符串（`STRINGS`）、`applyI18n()` |
| `examples.js` | 示例图表数据（`EXAMPLES_ZH`、`EXAMPLES_EN`）、默认代码（`DEFAULT_CODE`） |
| `editor.js` | CodeMirror 6 编辑器初始化、`getCode()`、`formatCode()`、`scheduleLint()` |
| `formatter.js` | Mermaid 代码格式化器（`formatMermaidCode`），支持流程图、时序图、类图、状态图、甘特图、饼图、思维导图等多种图表类型 |
| `render.js` | Mermaid 初始化/渲染（`initMermaid`、`renderDiagram`） |
| `export-utils.js` | 字体内联（`inlineFontsIntoSvg`）、SVG→PNG 转换（`svgToPngBlob`）；支持手绘字体（Kalam/Virgil/Caveat）和小赖中文字体（Xiaolai SC）的 Base64 内联 |
| `export.js` | 复制/下载 SVG/PNG（`copyPng`、`downloadSvg`、`downloadPng`）、URL 编码/解码（pako 压缩）、分享链接（`copyShareLink`）、嵌入代码（`copyEmbedCode`）；导出文件名包含图表类型和时间戳 |
| `tour.js` | 交互式引导教程（`startTour`） |
| `command-palette.js` | 命令面板（`Ctrl+K` / `openCmdPalette`） |

### 子目录 `modules/ui/`

| 文件 | 职责 |
|------|------|
| `theme.js` | UI 主题切换（`applyUiTheme`、`toggleUiTheme`）、手绘模式切换（`toggleHandDrawn`）、Mermaid 主题切换（`switchTheme`）、预览背景切换（`switchPreviewBg`）、导出背景色（`getExportBgColor`）、预览区丸子按钮初始化（`initPreviewPills`） |
| `layout.js` | 可拖动分割线初始化（`initLayout`），支持水平/垂直自适应布局 |
| `menu.js` | 菜单栏交互（`initMenu`）：示例下拉、主题/背景/手绘菜单项、分享嵌入、帮助、命令面板、格式化等所有菜单动作；`closeAllMenus` |
| `zoom.js` | 预览区缩放与平移（`initZoom`、`zoomTo`、`resetView`、`applyTransform`）；支持鼠标拖拽、滚轮缩放 |
| `mobile.js` | 移动端标签页切换（`switchMobileTab`）、移动端溢出菜单（`initMobileUI`） |
| `context-menu.js` | 预览区右键菜单（`initContextMenu`）：下载 PNG/SVG、复制 PNG |

### 依赖关系（无循环引用）

```
store.js      ← (无依赖)
dom.js        ← (无依赖)
utils.js      ← dom, store
i18n.js       ← store
examples.js   ← (无依赖)
editor.js     ← store, dom, formatter
formatter.js  ← (无依赖)
render.js     ← store, dom, i18n, editor
export-utils.js ← store, ui/theme
export.js     ← store, dom, utils, i18n, editor, export-utils
tour.js       ← store, i18n
command-palette.js ← store, i18n, examples, render, export

ui/theme.js   ← dom, store, render
ui/layout.js  ← dom
ui/zoom.js    ← dom, store
ui/menu.js    ← store, dom, examples, export, utils, editor, render, i18n, ui/theme, ui/zoom, command-palette, tour
ui/mobile.js  ← store, i18n, export, utils, ui/theme
ui/context-menu.js ← dom, export, utils

app.js        ← 所有模块
```

## 依赖（仅 CDN）

- **Mermaid 11** — 图表渲染（通过全局 `mermaid` 变量）
- **CodeMirror 6** — 编辑器，配合 `codemirror-lang-mermaid` 和 `@codemirror/theme-one-dark`
- **pako** — URL 分享时的代码压缩（通过全局 `pako` 变量）
- **手绘字体**：Kalam、Caveat（Google Fonts）、Virgil（jsDelivr）、Xiaolai SC（中文手绘字体，jsDelivr CDN 子集加载）

## 关键行为

- 输入后 300ms 防抖渲染，也可通过 `Ctrl+Enter` 手动触发
- PNG 导出默认 4 倍分辨率缩放（canvas），SVG 导出含字体内联
- 手绘模式支持三种字体（Kalam、Virgil、Caveat）、三种字号（小/中/大）、固定/随机种子
- 导出文件名格式：`{图表类型}-{YYYYMMDD-HHmmss}.{ext}`
- URL 分享：使用 pako 压缩后 base64url 编码，存于 `location.hash`；同时 localStorage 持久化（key: `mermzen-code`）
- 主题/手绘偏好持久化到 localStorage（key: `mermzen-handdrawn`、`mermzen-lang`）
- 引导教程仅在首次访问时自动启动（标记 key: `mermzen-tour-seen`）
- 响应式：`≤768px` 时切换为移动端标签页模式（编辑器/预览二选一）

## 博客 (`blog/`)

静态博客，提供中英文 Mermaid 教程文章：

```
blog/
  blog.css               — 博客样式
  _template-zh.html      — 中文文章模板
  _template-en.html      — 英文文章模板
  zh/index.html          — 中文博客列表页
  en/index.html          — 英文博客列表页
  zh/posts/              — 中文 Markdown 文章（flowchart、sequence、class、gantt、pie）
  en/posts/              — 英文 Markdown 文章
```

## 测试

项目使用 Playwright 进行端到端测试：

```bash
# 安装依赖
npm install

# 运行测试
npx playwright test test-tour.spec.js
```

- `playwright.config.js` — Playwright 配置，仅测试 `test-tour.spec.js`，使用 Chromium headless 模式
- `test-tour.spec.js` — 引导教程 E2E 测试
- `test-ui.js` — 其他 UI 测试脚本（非 Playwright 格式）

## 开发

直接在浏览器中打开 `index.html`，或用任意静态文件服务器：

```bash
python3 -m http.server
```

无构建、lint 命令；测试命令见上方"测试"章节。

## 其他文件

- `llms.txt` — 供 LLM 爬虫读取的项目概览（遵循 llms.txt 规范）
- `robots.txt` — 搜索引擎爬虫规则
- `sitemap.xml` — 站点地图
- `scripts/generate-sitemap.sh` — 自动生成 sitemap 的脚本
- `logo.svg` — 项目 Logo
