---
title: 如何用 Mermaid 画流程图
description: 深入讲解 Mermaid 流程图的节点形状、连线类型、子图分组、条件判断语法，附用户登录流程的完整实战示例。
date: 2026-03-04
slug: flowchart
---

# 如何用 Mermaid 画流程图

<span class="post-meta">2026-03-04 · MermZen 教程

流程图用于描述一个过程的步骤与决策路径，适合展示用户操作流程、业务审批逻辑、算法流程等场景。Mermaid 使用 `graph` 或 `flowchart` 关键字声明流程图，纯文本书写，无需绘图工具。

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKL0osyFAIcVGqBQBEswY6" width="100%" height="600" frameborder="0"></iframe>

## 声明图表

使用 `graph` 或 `flowchart` 关键字，后接方向参数：

```
graph TD
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKL0osyFAIcVGqBQBEswY6" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| 方向参数 | 含义 | 效果 |
|---------|------|------|
| `TD` / `TB` | Top → Down（从上到下） | 最常用，适合流程步骤 |
| `LR` | Left → Right（从左到右） | 适合状态机、管道 |
| `BT` | Bottom → Top（从下到上） | 倒序场景 |
| `RL` | Right → Left（从右到左） | 较少使用 |

## 节点形状

节点是流程图的基本元素，不同括号代表不同形状：

```
graph TD
    A[方框]
    B(圆角方框)
    C{菱形}
    D((圆形))
    E([椭圆])
    F[[子程序框]]
    G[(数据库)]
    H>标注旗帜]
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKL0osyFAIcYnJU1BQUHCMfjZt57OFbbEQrpPG0zltL5ZPgghqQgSdq1_0b3y6d1EthOuiAVL0dO8iTai8q0b0syVrn85pi4UKuEVHP1074fmK7qe7-kFmQw13j9Z4NnXDs951T3dN1oSKedg9W9D-bPOKZ9OnP90xJ1apFgBJ3Uqf" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| 语法 | 形状 | 典型用途 |
|------|------|---------|
| `A[文字]` | 矩形 | 普通步骤、动作 |
| `A(文字)` | 圆角矩形 | 子流程、子任务 |
| `A{文字}` | 菱形 | 判断条件、分支 |
| `A((文字))` | 圆形 | 连接点、汇合节点 |
| `A([文字])` | 椭圆 | 开始 / 结束节点 |
| `A[[文字]]` | 矩形带双线 | 子程序调用 |
| `A[(文字)]` | 圆柱 | 数据库、存储 |

## 连线类型

连线决定节点之间的视觉关系：

```
graph LR
    A --> B
    A --- C
    A -.-> D
    A ==> E
    A --文字--> F
    A -->|标签| G
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKL0osyFDwCYrJU1BQUHBU0NW1U3BCcHQVnOEcPV07BRcYz9bWTsEVoe7ZtPana6eDNLshmVTzbEH787X7ahTclWoBp5wgRw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| 语法 | 含义 |
|------|------|
| `A --> B` | 实线箭头（最常用） |
| `A --- B` | 实线无箭头 |
| `A -.-> B` | 虚线箭头（可选路径、弱依赖） |
| `A ==> B` | 粗线箭头（强调流程） |
| `A --文字--> B` | 带说明的连线 |
| `A -->|标签| B` | 带标签的连线（等价写法） |
| `A --o B` | 末端为圆圈 |
| `A --x B` | 末端为叉号（错误/拒绝路径） |

## 子图（subgraph）

用 `subgraph` 将相关节点分组，使流程图层次更清晰：

```
graph TD
    subgraph 前端
        A[用户界面] --> B[表单验证]
    end
    subgraph 后端
        C[API 网关] --> D[数据库]
    end
    B --> C
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKL0osyFAIcYnJU1BQUCguTYIIPO3sfb56PUQQBByjn09Z8axj-_OpPS_nLopV0NW1U3CKfrFwxdPeqS9X9bxY3xgLUZyal4Ju1IQ-FKOcox0DPBWe7534tHUzxCCX6GdTNzzrXfd012R0U5zACpyVagHR3EXO" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 完整示例：用户登录流程

```
graph TD
    A([开始]) --> B[用户输入账号 / 密码]
    B --> C{账号是否存在?}
    C -->|否| D[提示账号不存在]
    D --> B
    C -->|是| E{密码是否正确?}
    E -->|否| F[记录失败次数]
    F --> G{失败次数 ≥ 3?}
    G -->|是| H[锁定账号 30 分钟]
    G -->|否| B
    E -->|是| I[生成 Session Token]
    I --> J[跳转首页]
    J --> K([结束])
```
<a href="https://eric.run.place/MermZen/#eJxNj0FLwmAYx7_Kw04KSZE3D0Vzatoxb287REhFMCOhyybkIVlEOHLGiMRGbnnQzchYVPZhoufd9i2ivRN3_v_-v__zyNw5l1tf4Q64HHd4tn96BFVhTwIA2EoR_LrA52sxDZnMBvDE10dU9YLvLl5awczGjgergG7bf2yJrMNHZF5mKTVc1GycGPgw2mwyIv9PKKjZCgiEdjR_-MHg3_cbRsYqgY0mW9RwFSjIbJHJ6eTJN52FvLCUF0ngTHHew-FLMLPo2KS9aWwuRuaSnIzg58qC7MJTWs5tk1BvoXMf_5tdA1Tb4e1ATJLRIp-8IeqWia8PqKrBbq3ROK5LUK2f1KS4WY6uqJDAew3m49C-C823OKpE0U6K-J9d2h-Iaa75B8UPvnA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 速查表

| 语法 | 功能 |
|------|------|
| `graph TD` | 从上到下 |
| `graph LR` | 从左到右 |
| `A[文字]` | 方框节点 |
| `A{文字}` | 判断菱形 |
| `A([文字])` | 开始/结束 |
| `A --> B` | 实线箭头 |
| `A -->|标签| B` | 带标签箭头 |
| `A -.-> B` | 虚线箭头 |
| `subgraph 标题` | 子图分组 |
| `%% 注释` | 行注释 |

## 下一步

掌握流程图后，继续学习 [Mermaid 时序图](sequence.html)，用于描述系统之间的交互顺序。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
