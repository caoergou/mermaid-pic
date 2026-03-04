---
title: 如何用 Mermaid 画时序图
description: 用 Mermaid 时序图描述系统间的消息交互，包含参与者、箭头类型、循环与条件语法，附完整示例。
date: 2026-03-04
slug: sequence
---

## 什么是时序图？

时序图（Sequence Diagram）描述多个参与者之间按时间顺序发生的消息交互。适合展示 API 调用流程、用户与系统的交互、微服务间的通信等场景。相比流程图，时序图更强调**谁在什么时候做了什么**。

## 基本语法

### 声明图表与参与者

```
sequenceDiagram
    participant 用户
    participant 服务器
    participant 数据库
```

`participant` 声明参与者并控制显示顺序。如果不声明，直接在消息中使用名称也会自动创建。

### 消息箭头类型

```
sequenceDiagram
    A->>B: 实线带箭头（请求）
    B-->>A: 虚线带箭头（响应）
    A->B: 实线无箭头
    A-->B: 虚线无箭头
```

| 写法 | 含义 |
|------|------|
| `A->>B: 消息` | 实线带箭头，用于请求/调用 |
| `B-->>A: 消息` | 虚线带箭头，用于响应/返回 |
| `A-xB: 消息` | 带叉号，表示失败/丢弃 |

### 循环与条件

```
sequenceDiagram
    loop 每隔10秒
        客户端->>服务器: 心跳检测
        服务器-->>客户端: OK
    end

    alt 登录成功
        服务器->>客户端: 返回 Token
    else 登录失败
        服务器->>客户端: 返回错误信息
    end
```

- `loop 条件 ... end` — 循环块
- `alt/else/end` — 条件分支（类似 if/else）
- `opt 条件 ... end` — 可选操作块（类似 if，无 else）

## 完整示例：HTTP 登录接口

```
sequenceDiagram
    participant 浏览器
    participant API服务器
    participant 数据库

    浏览器->>API服务器: POST /login (账号, 密码)
    API服务器->>数据库: 查询用户信息
    数据库-->>API服务器: 返回用户记录

    alt 验证通过
        API服务器->>API服务器: 生成 JWT Token
        API服务器-->>浏览器: 200 OK { token }
        浏览器->>浏览器: 保存 Token 到 localStorage
    else 验证失败
        API服务器-->>浏览器: 401 Unauthorized
        浏览器->>浏览器: 显示错误提示
    end
```

<a href="https://caoergou.github.io/mermzen/" target="_blank" class="try-in-editor">在 MermZen 中试试 →</a>

## 常用语法速查

| 语法 | 含义 |
|------|------|
| `sequenceDiagram` | 声明时序图 |
| `participant A` | 声明参与者 |
| `participant A as 显示名` | 用别名显示 |
| `A->>B: 消息` | 实线带箭头 |
| `B-->>A: 消息` | 虚线带箭头 |
| `Note over A,B: 文字` | 参与者上方的备注 |
| `Note right of A: 文字` | 参与者右侧备注 |
| `loop 条件 ... end` | 循环块 |
| `alt/else/end` | 条件分支 |

## 下一步

了解时序图后，继续学习 [Mermaid 甘特图](gantt.html)，用于展示项目任务与时间安排。
