# Mermaid Editor

A lightweight, zero-dependency online Mermaid diagram editor with live preview and one-click export.

**Live demo: [eric.run.place/mermaid-pic](http://eric.run.place/mermaid-pic/)**

---

## Features

- Live preview with 300ms debounce
- 9 diagram types: flowchart, sequence, class, Gantt, pie, mindmap, ER, state, architecture
- Export SVG / PNG (PNG at 2x resolution)
- Copy SVG code or PNG image to clipboard
- Shareable URL (diagram encoded in hash)
- Hand-drawn style mode
- 5 Mermaid themes + dark / light UI toggle
- Pan, zoom, and checkerboard background in preview
- Edit history (last 20 snapshots)
- Inline syntax error with line number hint
- Built-in example templates and interactive tour

## Keyboard Shortcuts

| Action | Shortcut |
| --- | --- |
| Force render | `Ctrl+Enter` |
| Copy SVG | `Ctrl+Shift+C` |
| Copy PNG | `Ctrl+Shift+P` |
| Download SVG | `Ctrl+S` |
| Download PNG | `Ctrl+Shift+S` |

## Run Locally

No build step or package manager needed. Just serve the static files:

```bash
python3 -m http.server
# open http://localhost:8000
```

Or open `index.html` directly in a browser.

## Tech Stack

- [Mermaid 11](https://mermaid.js.org/) — diagram rendering
- [CodeMirror 6](https://codemirror.net/) — code editor
- No build tools, no framework, no package manager — all dependencies loaded via CDN

## Deployment

Pushing to `main` triggers a GitHub Actions workflow that deploys to GitHub Pages automatically.

---

## 中文介绍

一个轻量级的在线 Mermaid 图表编辑器，无需安装任何依赖，打开即用。

**主要功能：**

- 实时预览，输入后 300ms 自动渲染，也可按 `Ctrl+Enter` 立即触发
- 支持 9 种图表类型：流程图、时序图、类图、甘特图、饼图、思维导图、ER 图、状态图、架构图
- 一键导出 SVG 或 PNG（PNG 以 2 倍分辨率渲染，适合高清场景）
- 支持复制图片到剪贴板，方便粘贴到文档或聊天工具
- 分享链接功能，图表内容编码在 URL 中，无需后端
- 手绘风格模式，让图表看起来更自然
- 5 种 Mermaid 主题，支持深色/浅色 UI 切换
- 预览区支持缩放、平移，可开启棋盘格背景方便查看透明图
- 编辑历史记录，保留最近 20 条快照
- 语法错误提示精确到行号，方便快速定位问题
- 内置示例模板与交互式引导教程，上手零门槛

**本地运行：**

```bash
python3 -m http.server
# 访问 http://localhost:8000
```

无需安装 Node.js 或任何包管理器，直接在浏览器中打开 `index.html` 也可以运行。
