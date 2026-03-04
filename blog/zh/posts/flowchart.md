---
title: 如何用 Mermaid 画流程图
description: 完整的 Mermaid 流程图教程，包含节点形状、连线类型、条件判断、子图等语法详解，附开箱即用示例。
date: 2026-03-04
slug: flowchart
---

<div class="lang zh">

# 如何用 Mermaid 画流程图

<span class="post-meta">2026-03-04 · MermZen 教程</span>

流程图用于描述一个过程的步骤与决策路径，适合展示用户操作流程、业务审批逻辑、算法流程等场景。Mermaid 使用 `graph` 或 `flowchart` 关键字声明流程图，纯文本书写，无需绘图工具。

## 声明图表

使用 `graph` 或 `flowchart` 关键字，后接方向参数：

```
graph TD
```

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

</div>

<div class="lang en">

# Mermaid Flowchart Tutorial

<span class="post-meta">2026-03-04 · MermZen Tutorials</span>

Flowcharts describe the steps and decision paths of a process — perfect for user journeys, approval workflows, and algorithm logic. Mermaid uses the `graph` or `flowchart` keyword to declare a flowchart in plain text, no drawing tools required.

## Declaring a Chart

Use `graph` or `flowchart` followed by a direction parameter:

```
graph TD
```

| Direction | Meaning | Best for |
|-----------|---------|---------|
| `TD` / `TB` | Top → Down | Most common; step-by-step flows |
| `LR` | Left → Right | State machines, pipelines |
| `BT` | Bottom → Top | Reverse order diagrams |
| `RL` | Right → Left | Rarely used |

## Node Shapes

Nodes are the building blocks. Different bracket styles create different shapes:

```
graph TD
    A[Rectangle]
    B(Rounded rect)
    C{Diamond}
    D((Circle))
    E([Stadium / pill])
    F[[Subroutine]]
    G[(Database)]
```

| Syntax | Shape | Typical use |
|--------|-------|------------|
| `A[text]` | Rectangle | Steps, actions |
| `A(text)` | Rounded rectangle | Subprocesses |
| `A{text}` | Diamond | Conditions, decisions |
| `A((text))` | Circle | Connectors, junctions |
| `A([text])` | Stadium | Start / End nodes |
| `A[[text]]` | Double-border rect | Subroutine calls |
| `A[(text)]` | Cylinder | Databases, storage |

## Connection Types

Links define how nodes relate visually:

```
graph LR
    A --> B
    A --- C
    A -.-> D
    A ==> E
    A --label--> F
    A -->|label| G
```

| Syntax | Meaning |
|--------|---------|
| `A --> B` | Solid arrow (most common) |
| `A --- B` | Solid line, no arrow |
| `A -.-> B` | Dashed arrow (optional path) |
| `A ==> B` | Thick arrow (emphasis) |
| `A --text--> B` | Arrow with inline label |
| `A -->|label| B` | Arrow with label (alternate) |
| `A --o B` | Circle endpoint |
| `A --x B` | Cross endpoint (error/rejection) |

## Subgraphs

Use `subgraph` to group related nodes and add visual hierarchy:

```
graph TD
    subgraph Frontend
        A[UI Layer] --> B[Form Validation]
    end
    subgraph Backend
        C[API Gateway] --> D[Database]
    end
    B --> C
```

## Full Example: User Login Flow

```
graph TD
    A([Start]) --> B[User enters credentials]
    B --> C{Account exists?}
    C -->|No| D[Show error message]
    D --> B
    C -->|Yes| E{Password correct?}
    E -->|No| F[Increment fail count]
    F --> G{Fails >= 3?}
    G -->|Yes| H[Lock account 30 min]
    G -->|No| B
    E -->|Yes| I[Generate Session Token]
    I --> J[Redirect to dashboard]
    J --> K([End])
```

## Quick Reference

| Syntax | Description |
|--------|-------------|
| `graph TD` | Top-down layout |
| `graph LR` | Left-right layout |
| `A[text]` | Rectangle node |
| `A{text}` | Diamond (decision) |
| `A([text])` | Start/End (stadium) |
| `A --> B` | Solid arrow |
| `A -->|label| B` | Labeled arrow |
| `A -.-> B` | Dashed arrow |
| `subgraph title` | Group nodes |
| `%% comment` | Line comment |

## Next Up

After flowcharts, learn [Mermaid Sequence Diagrams](sequence.html) to visualize interactions between systems over time.

</div>
