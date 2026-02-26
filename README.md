# Mermaid Editor

在线 Mermaid 图表编辑器，支持实时预览与一键导出。

**在线使用：[eric.run.place/mermaid-pic](http://eric.run.place/mermaid-pic/)**

## 功能

- 实时预览，输入后 300ms 自动渲染
- 支持 9 种图表类型：流程图、时序图、类图、甘特图、饼图、思维导图、ER 图、状态图、架构图
- 导出 SVG / PNG（PNG 以 2x 分辨率渲染）
- 复制 SVG 代码或 PNG 图片到剪贴板
- 分享链接（图表内容编码在 URL 中）
- 手绘风格模式（Rough.js）
- 5 种 Mermaid 主题 + 深色/浅色 UI 切换
- 预览区缩放、平移、棋盘格背景
- 编辑历史记录（最近 20 条）
- 语法错误提示，精确到行号
- 内置示例模板与交互式引导教程

## 快捷键

| 操作 | 快捷键 |
|------|--------|
| 立即渲染 | `Ctrl+Enter` |
| 复制 SVG | `Ctrl+Shift+C` |
| 复制 PNG | `Ctrl+Shift+P` |
| 下载 SVG | `Ctrl+S` |
| 下载 PNG | `Ctrl+Shift+S` |

## 本地运行

无需安装任何依赖，直接用静态文件服务器打开即可：

```bash
python3 -m http.server
# 然后访问 http://localhost:8000
```

或者直接在浏览器中打开 `index.html`。

## 技术栈

- [Mermaid 11](https://mermaid.js.org/) — 图表渲染
- [CodeMirror 6](https://codemirror.net/) — 代码编辑器
- 无构建步骤，无框架，无包管理器，全部依赖通过 CDN 加载

## 部署

推送到 `main` 分支后，GitHub Actions 自动部署到 GitHub Pages。
