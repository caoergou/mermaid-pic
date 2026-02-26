# Mermaid Editor

A lightweight, zero-dependency online Mermaid diagram editor with live preview and one-click export.

零依赖在线 Mermaid 图表编辑器，实时预览，一键导出。

**Live demo · 在线体验：[eric.run.place/mermaid-pic](http://eric.run.place/mermaid-pic/)**

---

## Features · 功能

- Live preview with 300ms debounce · 实时预览，300ms 防抖渲染
- 9 diagram types: flowchart, sequence, class, Gantt, pie, mindmap, ER, state, architecture · 支持 9 种图表类型
- Export SVG / PNG (PNG at 2x resolution) · 导出 SVG / PNG（PNG 2 倍分辨率）
- Copy SVG code or PNG image to clipboard · 复制 SVG 代码或 PNG 图片到剪贴板
- Shareable URL (diagram encoded in hash) · 分享链接（图表内容编码在 URL 中）
- Hand-drawn style mode · 手绘风格模式
- 5 Mermaid themes + dark / light UI toggle · 5 种图表主题 + 深色/浅色切换
- Pan, zoom, and checkerboard background in preview · 预览区缩放、平移、棋盘格背景
- Edit history (last 20 snapshots) · 编辑历史记录（最近 20 条）
- Inline syntax error with line number hint · 语法错误提示，精确到行号
- Built-in example templates and interactive tour · 内置示例模板与交互式引导教程

## Keyboard Shortcuts · 快捷键

| Action · 操作 | Shortcut · 快捷键 |
| --- | --- |
| Force render · 立即渲染 | `Ctrl+Enter` |
| Copy SVG · 复制 SVG | `Ctrl+Shift+C` |
| Copy PNG · 复制 PNG | `Ctrl+Shift+P` |
| Download SVG · 下载 SVG | `Ctrl+S` |
| Download PNG · 下载 PNG | `Ctrl+Shift+S` |

## Run Locally · 本地运行

No build step or package manager needed. Just serve the static files:

无需安装任何依赖，直接用静态文件服务器打开：

```bash
python3 -m http.server
# open http://localhost:8000
```

Or open `index.html` directly in a browser. · 或直接在浏览器中打开 `index.html`。

## Tech Stack · 技术栈

- [Mermaid 11](https://mermaid.js.org/) — diagram rendering · 图表渲染
- [CodeMirror 6](https://codemirror.net/) — code editor · 代码编辑器
- No build tools, no framework, no package manager — all dependencies loaded via CDN
- 无构建步骤，无框架，无包管理器，全部依赖通过 CDN 加载

## Deployment · 部署

Pushing to `main` triggers a GitHub Actions workflow that deploys to GitHub Pages automatically.

推送到 `main` 分支后，GitHub Actions 自动部署到 GitHub Pages。
