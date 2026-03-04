# MermZen

<p align="center">
  <img src="logo.svg" alt="MermZen Logo" width="96" height="96" />
</p>

[![Deploy to GitHub Pages](https://github.com/caoergou/mermzen/actions/workflows/deploy.yml/badge.svg)](https://github.com/caoergou/mermzen/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/caoergou/mermzen)](https://github.com/caoergou/mermzen/stargazers)

**MermZen** 是一个简洁轻量的 Mermaid 图表编辑器。打开即用，写语法，看图表——体验就这么简单，没有多余的东西。

名称取自 **Mermaid**（图表语法）与 **Zen**（禅）——设计感与轻量化是它的核心。

**在线体验：[MermZen](https://eric.run.place/MermZen/)**

[English](README.md)

---

## 效果预览

下面的图表均由 MermZen 直接导出，手绘风格。导出的 SVG 可直接粘贴进任何 HTML 页面使用；也可通过 `<iframe>` 嵌入一个实时交互的动态图表：

<p align="center">
  <img src="assets/preview-flowchart.svg" alt="流程图 — 用户登录流程（手绘风格）" width="46%" />
  &nbsp;
  <img src="assets/preview-class.svg" alt="类图 — 电商订单模型（手绘风格）" width="46%" />
</p>

<p align="center">
  <img src="assets/preview-sequence.svg" alt="时序图 — HTTP 登录接口调用链（手绘风格）" width="94%" />
</p>

---

## 为什么做 MermZen

Mermaid 官方的在线编辑器越来越繁琐，用起来并不简单：AI 推荐、会员订阅、冗余面板挤满屏幕，界面越做越重，你只是想写几行语法看到图表，却不得不先绕过一堆无关的东西。

MermZen 填补这个空缺：基于 CodeMirror 6 构建，支持 Mermaid 语法高亮与自动补全，错误提示精确到行；图表内容编码在 URL hash 中，分享时无需后端、无需账号、链接永不失效，复制 URL 即可。

---

## 主要功能

**编辑器**
- CodeMirror 6，支持 Mermaid 语法高亮与自动补全
- 错误提示精确到行号，快速定位语法问题
- 代码格式化与命令面板（`Ctrl+K`）
- 完整的键盘快捷键体系

**预览**
- 实时渲染，输入后 300ms 自动更新
- 支持 11 种图表类型：流程图、时序图、类图、甘特图、饼图、思维导图、ER 图、状态图、架构图、Git 图、块图
- 预览区支持缩放、平移，棋盘格背景便于查看透明图
- 右键上下文菜单，快速导出

**输出**
- 导出 SVG 或 PNG（PNG 以 2 倍分辨率渲染，适合高清场景）
- 直接复制 PNG 到剪贴板
- 分享链接——图表状态编码在 URL hash 中，无需服务端
- iframe 嵌入——通过 `embed.html` 将动态手绘图表嵌入任何网页，零依赖

**外观**
- 手绘风格模式（支持中文手写字体）
- 5 种 Mermaid 主题，支持深色 / 浅色 UI 切换

**上手引导**
- 内置示例模板
- 交互式引导教程，首次使用可快速了解所有功能

---

## 快捷键

| 操作 | 快捷键 |
| --- | --- |
| 保存（选格式） | `Ctrl+S` |
| 复制 PNG | `Ctrl+Shift+C` |
| 格式化代码 | `Ctrl+Shift+F` |
| 命令面板 | `Ctrl+K` |
| 文件/编辑/视图/帮助菜单 | `Alt+F/E/V/H` |
| 切换预览背景 | `Alt+1/2/3/4` |

