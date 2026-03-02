# Mermaid Editor

[![Deploy to GitHub Pages](https://github.com/caoergou/mermaid-pic/actions/workflows/deploy.yml/badge.svg)](https://github.com/caoergou/mermaid-pic/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/caoergou/mermaid-pic)](https://github.com/caoergou/mermaid-pic/stargazers)

A lightweight, zero-dependency online Mermaid diagram editor with live preview and one-click export.

**Live demo: [caoergou.github.io/mermaid-pic](https://caoergou.github.io/mermaid-pic/)**

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

---

## Use with AI

This editor is designed to work seamlessly with AI assistants. Describe what you want to visualize in plain language, paste the generated code into the editor, and your diagram renders instantly — no syntax knowledge required.

### Workflow

```
1. Open https://caoergou.github.io/mermaid-pic/
2. Set the system prompt below in your AI (Claude, ChatGPT, Gemini…)
3. Describe your diagram in plain language
4. Copy the AI output → paste into the editor
5. Tweak visually, then export as SVG / PNG
```

### System Prompt — copy this directly to your AI

````
You are a Mermaid diagram code generator. When I describe what I want to visualize, output ONLY the raw fenced code block — no explanation, no prose, no extra text.

## Supported diagram types

| Type | Opening keyword |
|---|---|
| Flowchart | `flowchart TD` or `flowchart LR` |
| Sequence diagram | `sequenceDiagram` |
| Class diagram | `classDiagram` |
| State machine | `stateDiagram-v2` |
| Entity-relationship | `erDiagram` |
| Gantt chart | `gantt` |
| Pie chart | `pie title …` |
| Mindmap | `mindmap` |
| Architecture | `architecture-beta` |

## Output format

Always wrap in a fenced code block exactly like this:

```mermaid
<diagram code here>
```

## Rules

1. Output ONLY the code block — no before/after text
2. Labels must be concise (≤ 5 words each); quote labels containing spaces: `A["My Node"]`
3. Keep diagrams focused — ≤ 20 nodes per diagram
4. Prefer `LR` direction for wide/pipeline graphs, `TD` for trees/hierarchies
5. For sequence diagrams, use `participant` aliases to keep lines short
6. For Gantt charts, always include a `dateFormat` and `section`
7. If the request is ambiguous, make a reasonable interpretation and generate the diagram anyway

The output will be pasted directly into https://caoergou.github.io/mermaid-pic/
````

### Example Prompts

Try these verbatim — just paste them after the system prompt above:

**Process / Flow**
> Draw a flowchart (left to right) of an e-commerce checkout: user adds items to cart → enters shipping info → payment gateway charges card → on success send confirmation email, on failure show retry screen.

**System Architecture**
> Architecture diagram of a typical web app: user's browser talks to a CDN, CDN routes to a load balancer, load balancer splits traffic between two app servers, both read from a primary Postgres database with a read replica.

**Sequence / API**
> Sequence diagram: mobile app calls POST /login → auth service validates credentials → on success, auth service calls token service to issue JWT → returns 200 with token to app; on failure returns 401.

**Data Model**
> ER diagram for a blog: User has many Posts; Post has many Comments; Comment belongs to User; Post has many Tags (many-to-many).

**Timeline / Planning**
> Gantt chart for a 4-week product launch: week 1 design mockups, week 2 frontend build, week 3 QA + bug fixes, week 4 deployment and marketing.

**Mind Map**
> Mindmap of the main pillars of DevOps: CI/CD, Infrastructure as Code, Monitoring & Observability, and Culture.

### Tips for Iterative Editing

- **Refine in plain language**: after pasting, tell the AI "add a decision node for email verification" and paste again.
- **Use `Ctrl+K`** (command palette) to switch themes without re-generating.
- **Share URL**: the shareable link encodes your diagram — paste it back to an AI as context for further edits.
- **Hand-drawn mode**: toggle the pencil icon in the toolbar for a sketch look, great for early-stage diagrams.

---

## Keyboard Shortcuts

| Action | Shortcut |
| --- | --- |
| Force render | `Ctrl+Enter` |
| Copy SVG | `Ctrl+Shift+C` |
| Copy PNG | `Ctrl+Shift+P` |
| Download SVG | `Ctrl+S` |
| Download PNG | `Ctrl+Shift+S` |
| Command palette | `Ctrl+K` |
| Format code | `Ctrl+Shift+F` |

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

---

## 配合 AI 使用

本编辑器专为和 AI 协作而设计。用自然语言描述你想画的内容，把 AI 生成的代码粘贴进编辑器，图表立即渲染——无需学习 Mermaid 语法。

### 使用流程

```
1. 打开 https://caoergou.github.io/mermaid-pic/
2. 把下方系统提示词设置到你的 AI（Claude、ChatGPT、Gemini 等）
3. 用自然语言描述你想画的图
4. 复制 AI 输出 → 粘贴到编辑器
5. 在编辑器里微调，然后一键导出 SVG / PNG
```

### 系统提示词 — 直接复制给 AI 即可使用

````
你是一个 Mermaid 图表代码生成专家。我描述想画的内容后，你只输出 Mermaid 代码块，不能有任何解释、前言或多余文字。

## 支持的图表类型

| 类型 | 开头关键词 |
|---|---|
| 流程图 | `flowchart TD` 或 `flowchart LR` |
| 时序图 | `sequenceDiagram` |
| 类图 | `classDiagram` |
| 状态机 | `stateDiagram-v2` |
| ER 图 | `erDiagram` |
| 甘特图 | `gantt` |
| 饼图 | `pie title …` |
| 思维导图 | `mindmap` |
| 架构图 | `architecture-beta` |

## 输出格式

必须严格使用以下格式输出：

```mermaid
（图表代码）
```

## 规则

1. 只输出代码块，前后不加任何文字
2. 标签简洁（每个节点 ≤ 10 个字），含空格或特殊字符的标签加引号：`A["我的节点"]`
3. 每张图节点数控制在 20 个以内，保持清晰
4. 宽图/流水线图用 `LR` 方向，树形/层级图用 `TD` 方向
5. 时序图使用 `participant` 别名缩短消息行
6. 甘特图必须包含 `dateFormat` 和 `section`
7. 需求模糊时，合理推断并直接生成，不要反问

我会把你的输出直接粘贴到 https://caoergou.github.io/mermaid-pic/
````

### 示例提示词（直接使用）

**流程 / 业务逻辑**
> 画一个从左到右的流程图：用户下单 → 库存系统检查库存 → 库存充足则扣减并通知物流，库存不足则通知用户补货。

**系统架构**
> 画一个架构图：用户浏览器访问 CDN，CDN 将请求路由到负载均衡器，负载均衡器分发到两台应用服务器，两台服务器共用一个主 Postgres 数据库（带一个只读副本）。

**时序 / API 交互**
> 时序图：手机 App 调用 POST /login → 认证服务校验密码 → 成功后调用 Token 服务签发 JWT → 返回 200 和 token；失败返回 401。

**数据模型**
> ER 图：用户可以发布多篇文章，文章可以有多条评论，评论归属于用户，文章和标签是多对多关系。

**项目规划**
> 甘特图：一个为期四周的版本发布计划。第 1 周设计原型，第 2 周前端开发，第 3 周 QA 测试和 bug 修复，第 4 周上线和市场推广。

**思维导图**
> 思维导图：机器学习的主要分支——监督学习、无监督学习、强化学习，每个分支列出 2~3 个典型算法。

### 迭代技巧

- **用自然语言追加修改**：粘贴后，继续对 AI 说「在成功路径后加一个发送邮件的步骤」，再次粘贴即可。
- **`Ctrl+K` 命令面板**：快速切换主题、导出、加载示例，无需重新生成。
- **分享链接**：生成的链接包含完整图表内容，可直接粘贴给 AI 作为上下文，让它基于现有图继续修改。
- **手绘模式**：工具栏右上角点击铅笔图标，切换手绘风格，适合早期草图和演示场合。
