---
title: 如何用 Mermaid 画时序图
description: 学习时序图的参与者声明、消息样式、循环/条件结构，以 HTTP 登录接口为例展示完整的 API 调用链路。
date: 2026-03-04
slug: sequence
---

# 如何用 Mermaid 画时序图

<span class="post-meta">2026-03-04 · MermZen 教程

时序图（Sequence Diagram）描述多个参与者之间**按时间顺序**发生的消息交互。与流程图不同，时序图的核心问题是：**谁在什么时候向谁发送了什么**。适合展示 API 调用链路、用户与系统的交互、微服务通信等场景。
<iframe src="https://eric.run.place/MermZen/embed.html#jZJtSxtBEMff-ykGX2lRTKVWOFARez5VjeYOfFmWZA1Hz7v09kQkHFRBDaJEUEtSChrwCR8aS9Wg1vbT7N3mW7jZxXA2p-29OnbmN_-Z_wzBn-awlcTvDJR20GwT8A8lXduBYPvYz1XEQwY5rpE0Mshywb_Ks6McLR43RPonR_xvG3StFBVM4JRBgl9b9LzQEBtf0KbGmsSzFG3v7a3LKEBLp3SlyC4Pab5CyyvB3iK9uQ6WbujqXVC8o_c7gqwDHA53osBkXNOhA2WMDtNOGxZk5wh2LDSL23gXhMzbTsqT6mGOlwn1rMCQqoPgP8wgw1TqRTxBhlLbGxqg-z_Y5YF_VvJ3LqAl1hopJkxQQFPH1AEdXsFgIj4ONREC08NqQoVHwZ4-gYv8Ri1pIPt-UfNFbtN0QdpWPVln5cXq56_sz6oIRbTxd7VdP7cJo9M66PZHbEHLsNbZ9bb1OfqJYxp3jGBCDNtSsm4N96A7FY0-3XhnLAbx9yChNjG5V-fCiw5fyXmBLh_wFSWRqfH7RWkcgXBGOqQAq_xk92fVwy_V0pXIxCbBj05tF1m5_F9TjkwMJF44jH9M-ib2GrLYcWxHgeawdrP3cvd-4Xewfytz_fwm_5czWKkH" width="100%" height="500" frameborder="0"></iframe>

## 为什么用时序图？

时序图是展示**交互流程**的最佳选择：

- **展示多个参与者之间的消息交互** — 清晰呈现"谁对谁做了什么"
- **特别适合展示 API 调用链路** — 前端→后端→数据库→缓存的完整链路一目了然
- **清晰表达"谁在什么时候向谁发送了什么"** — 时间轴从上到下，顺序直观

```
sequenceDiagram
    actor 用户 as User
    participant 前端 as Frontend
    participant API as API Server
    participant 数据库 as Database
    
    用户->>前端: 点击登录
    前端->>API: POST /api/login
    API->>数据库: SELECT * FROM users
    数据库-->>API: 用户数据
    API-->>前端: 200 OK + Token
    前端-->>用户: 跳转首页
```
<a href="https://eric.run.place/MermZen/#bZBfT4MwFMW_yk0f1WUItvx5WGLclhg1LIJvvFygLEQt2MJejN_d2yEbbuvDadP7u-ee9pvtWOTesIJFzMivXqpCLmvcavzMFNDComs0ZL3P3SDrhev5gAbejNRDvUXd1UXdouqI4u5dSSzKylJr3ahOqvKcvN88WsBuidS7y2aC-w6pJyQZy9CzHUvsMEcjB_5PJ-Fmi8U0RWSLTh7S3W2V01n4pLzifGw9stRKeSLYxEkKc2zr-UezrdUAUmVvfZopgmT1vHpI4QrWr_EL9PQxZvQ-hWfjiGnif9hh1tk7XMeB-AmuIW3epbqQft9xtLVDgrLySCtRZH0YhoI08Dn7-QU" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 声明图表与参与者

```
sequenceDiagram
    participant 用户
    participant 服务器
    participant 数据库
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqTi0sTc1LTnXJTEwvSsyNyVNQUFAoSCwqyUzOLEjMK1F4PmXFs47tmOLP5vQ-7Vr4dOYKLFJTNzzrXfd012SlWgB3_iyk" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

- `sequenceDiagram` 声明图表类型
- `participant 名称` 显式声明参与者，**控制左右排列顺序**
- 若不声明，在消息中使用的名称会自动创建参与者（按出现顺序排列）
- 使用 `actor 名称` 可以将参与者渲染为小人图标（适合表示真实用户）

**为参与者设置别名**，使代码简洁：

```
sequenceDiagram
    participant U as 用户
    participant S as 服务器
    U->>S: 发送请求
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqTi0sTc1LTnXJTEwvSsyNyVNQUFAoSCwqyUzOLEjMK1EIVUgsVng-ZcWzju2YksEgyWdzep92LXw6cwVEPlTXzi7YSuFp_8SXDY0v1m9_trFJqRYAeNUuOA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 消息箭头类型

Mermaid 提供六种消息样式，覆盖请求、响应、异步等场景：

```
sequenceDiagram
    A->>B: 实线带开放箭头（同步请求）
    B-->>A: 虚线带开放箭头（同步响应）
    A->B: 实线无箭头
    A-->B: 虚线无箭头
    A-xB: 实线带叉（失败/丢弃）
    A-)B: 实线带异步箭头（非阻塞）
    A--)B: 虚线带异步箭头
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqTi0sTc1LTnXJTEwvSsyNyVNQUFBw1LWzc7JSeLpu3vNd-5_uWPZ0T8OzKfuer1v7dMmW93s6nk7oebZ26Yv1259tbHq_pxOix0lX187O0UrhxcxZeDQ9ndz7dNcUuCZHXYQ9z6YvgCiGSYHlIMZhyFWgOK-_E2TBko0vtizVf7Jj0dM9zUg2aKL6pOnZ2qVwR72cO-_ljN1PF85DUg_WgOQLhAalWgA8x6xp" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| 语法 | 常见使用场景 |
|------|------------|
| `A->>B: 消息` | 同步调用、HTTP 请求 |
| `B-->>A: 消息` | 返回值、HTTP 响应 |
| `A-)B: 消息` | 异步消息、事件发布 |
| `A-xB: 消息` | 失败的调用、丢弃的消息 |

### 箭头类型选择指南

选择正确的箭头类型可以让图表语义更清晰：

| 箭头类型 | 语法 | 适用场景 |
|---------|------|---------|
| 实线箭头 `->>` | `A->>B: 请求` | 同步请求、HTTP 请求、函数调用 |
| 虚线箭头 `-->>` | `B-->>A: 响应` | 返回值、HTTP 响应、回调结果 |
| 异步箭头 `->)` | `A-)B: 事件` | 事件发布、非阻塞调用、WebSocket 消息 |
| 失败箭头 `-x` | `A-xB: 超时` | 错误的调用、超时、请求失败 |

```
sequenceDiagram
    participant 客户端
    participant 服务器
    
    客户端->>服务器: HTTP请求 (同步)
    服务器-->>客户端: HTTP响应 (返回值)
    
    客户端-)服务器: WebSocket消息 (异步)
    服务器--)客户端: 推送通知 (异步响应)
    
    客户端-x服务器: 请求超时 (失败)
```
<a href="https://eric.run.place/MermZen/#hZA_a8MwEMW_itFUQQOyLJ1lD5k6dCw00EXLWX-CCXHT1AqB0u_ek9tAmhis4aHTvfvpSV_sxFr5yBxr2Wf4SGFw4anH7RH3dihoHfA49q4_4DAWNukOpU0gq9qmGkOc80AtPDkllqQA5tfzp3eE1Xp9P9IWz5vNi02mi2QDp2TxQB0lHFUdaH6h3Q6uJtztHRecVi67Q6MyzkSv8pQPpKJyfCEon8v5FrrXd7cLIzW9MaQC4hQ2CrkYls9lpapCIjVClFlLpE4d9H_q9WuWkp_nkl__Lu29ISToCNM1TVXmM6k5-_4B" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 备注（Note）

在参与者旁边添加说明文字：

```
sequenceDiagram
    participant A
    participant B
    Note right of A: 这是 A 的备注
    Note over A,B: 横跨多个参与者的备注
    A->>B: 消息
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqTi0sTc1LTnXJTEwvSsyNyVNQUFAoSCwqyUzOLEjMK1FwxBRyggj55ZekKhRlpmeUKOSnKThaKbzYP_PZjPUKjgrPZ7U8XdL-bPMKJIX5ZalFCo46TlYKz1aserF9xdMls57sWPW0v-nJjr4XDa1oWhx17exASrd1PGtcr1QLADkLSl8" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 最佳实践

### 参与者命名建议

- 使用 `actor` 表示**真实用户**（会渲染为小人图标）
- 使用 `participant` 命名**系统组件**（服务、数据库、缓存等）
- 使用 `as` 关键字设置**简短别名**，保持代码简洁

### 添加关键说明

使用 `note` 为关键步骤添加说明，帮助读者理解复杂逻辑：

```
sequenceDiagram
    participant A
    participant B
    Note right of A: 这是 A 的备注
    Note over A,B: 横跨多个参与者的备注
    A->>B: 消息
```

### 控制参与者数量

**建议参与者不超过 5 个**。过多的参与者会让图表变得难以阅读。如果系统复杂，考虑：
- 拆分为多个时序图
- 使用 `box` 将相关参与者分组
- 省略次要的中间步骤

```
sequenceDiagram
    actor 用户
    participant 前端
    participant API服务
    participant 缓存
    participant 数据库
    
    Note over 用户,数据库: 推荐不超过5个参与者
    
    用户->>前端: 发起请求
    前端->>API服务: API调用
    API服务->>缓存: 查询缓存
    缓存-->>API服务: 缓存命中
    API服务-->>前端: 返回结果
    前端-->>用户: 显示数据
```
<a href="https://eric.run.place/MermZen/#bVGxboMwEP0V5DmRwId9hiFSpS5dqn4Ai7GPiqGQUMhS9d97Nm1Dgj3ccO-9e3fPX-IqankQTtTiky4LDY6ee_s-2Y9myPhZN49T1iyopGkWLQHX_tlOc-_6sx1mRpUsPXMsdXv06e2FhZj7QLNFSo5dAYy2yqRQrTDnCpqYQxWsnLW-jjNl45XuVzzsRXUYBJYJBhQjJYWFjDeKa-dQhZa0TAYnI8xCk-dq67b1OJ5O27vDfAW-CDMRubYdV-1K-Se9cVn6EEq9pmRcDr8eUfTAipa3rOJJSOGAluQ-xW3nmPK8kyyqRB9D8GnzxMGm8yX3tOeskDwEfuUSB6-b_2cXN9cQVBXY7WeJ7x8" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 与其他图表对比

| 特性 | 时序图 | 流程图 | 活动图 |
|------|--------|--------|--------|
| **核心关注** | 时间顺序 | 决策分支 | 流程步骤 |
| **适合场景** | API 调用链、微服务通信 | 业务逻辑、决策流程 | 工作流、业务流程 |
| **参与者** | 多个（建议 ≤5） | 无限制 | 无限制 |
| **时间表达** | 从上到下，直观 | 无时间概念 | 可标注时间 |

**选择建议：**
- 需要展示**谁对谁做了什么** → 时序图
- 需要展示**条件分支和循环** → 流程图
- 需要展示**完整业务流程** → 活动图

## 控制结构

### 循环（loop）

```
sequenceDiagram
    loop 每隔 30 秒
        客户端->>服务器: 心跳检测
        服务器-->>客户端: pong
    end
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqTi0sTc1LTnXJTEwvSsyNyVNQUFDIyc8vUHi2vv_lrCkKxgYKz5dPgoiDwNN1i551bH--er2und2zOb1PuxY-nbnCSuHp_uYX2zc_W9zwbGs3QjFcga6unR1cp5VCQX5eOkRVal6KUi0APURABA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

### 条件分支（alt / else）

```
sequenceDiagram
    客户端->>服务器: POST /login
    alt 验证通过
        服务器-->>客户端: 200 OK + Token
    else 密码错误
        服务器-->>客户端: 401 Unauthorized
    else 账号被锁定
        服务器-->>客户端: 403 Forbidden
    end
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqTi0sTc1LTnXJTEwvSsyNyVNQUFB4um7Rs47tz1ev17Wzezan92nXwqczV1gpBPgHhyjo5-SnZ-ZB1CXmlCi8XNXzYn3jy4ZZL_a3Q0RBAK5LV9fODm6clYKRgYGCv7eCtkJIfnYq1JTUnOJUhafr254vaHw5ZeaL9esJG2NiYKgQmpdYWpKRX5RZlZqCZNCLLcue9m9_sWj1yymNT9fNIsYsYwW3_KKkzJQUuIvyUpRqAVPWgJ8" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

### 可选操作（opt）

```
sequenceDiagram
    服务器->>客户端: 返回数据
    opt 开启了通知
        服务器->>推送服务: 发送通知
    end
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqTi0sTc1LTnXJTEwvSsyNyVNQUFB4Nqf3adfCpzNX6NrZPV236FnH9uer11spvNg_5ensec-mbnjWuw6iML-gROHpnoanE9Y_2dX2smHW8_lLIRLopjzrW_GyoREiYqXwtH_iy4ZGZPWpeSlKtQA8ikp5" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

### 并行操作（par）

```
sequenceDiagram
    par 同时执行
        服务器->>邮件服务: 发送邮件
    and
        服务器->>短信服务: 发送短信
    end
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqTi0sTc1LTnXJTEwvSsyNyVNQUFAoSCxSeDqh59n0bc86l79Y2AMRBYFnc3qfdi18OnOFrp3dy6Z1T3Zvg4hYKTztn_iyoREiBlGfmJeCXePz-Wuf7F-IqhEiBlGfmpeiVAsAn4hNkg" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 完整示例：HTTP 登录接口调用链

```
sequenceDiagram
    actor 用户
    participant 浏览器
    participant API服务器
    participant Redis缓存
    participant MySQL

    用户->>浏览器: 填写账号密码并点击登录
    浏览器->>API服务器: POST /api/login {username, password}

    API服务器->>Redis缓存: GET login_fail:{username}
    Redis缓存-->>API服务器: 失败次数 (0)

    API服务器->>MySQL: SELECT * FROM users WHERE username=?
    MySQL-->>API服务器: 用户记录

    alt 密码验证通过
        API服务器->>API服务器: 生成 JWT Token (HS256)
        API服务器->>Redis缓存: SET session:{token} 7d
        API服务器-->>浏览器: 200 OK {token, user}
        浏览器->>浏览器: 存入 localStorage
        浏览器-->>用户: 跳转首页
    else 密码错误
        API服务器->>Redis缓存: INCR login_fail:{username}
        API服务器-->>浏览器: 401 {error: "密码错误"}
        浏览器-->>用户: 显示错误提示
    end
```
<a href="https://eric.run.place/MermZen/#eJyNkm9r01AUxr_KIa82aVgt_oELRmRGN93sbAJ7U5BLei3B7KbemylSAk5wK6J04CatCFro5tDNTtws25x-mpuk30KWu9Z0bdW395zfec7znFtWHikok1IsBSmcPFwk1CLXbVxkeCFPAQCw5bkMwrWtoNKWLyXMPNuyS5h6EOxXo48VUd8aLF2bmw7evRIvGkOrOVKwefjjtdipDRZnnxh3Z_JUFqS0qmk9LQSi8Vks16O9TVFti9Zy-GFJHHwPnx2IlaOwfiSO1yXaI1RNS66DYC5rmDCBS_aE4xZtCuVFThjFCyQFJcz5Y5cV_O4CSVLVtMTmCG7qJsQT7t3HtoN6Y3yJJnrVgR1E82u0txFsN4L1XRhLj4_Qi8NAYOgz-qQJ5-BGLjsLJzoc5qf0nA5dzStXJR8Dg3Iyx-jLbhzP6XEdD2R-nU8vo9ZS5-nb6NeKrA1Z5ezA90FlFW7Nm2C6DwiFsSkjc_HS-Ei8LzlDN4ETzm2XorJ3wvtwuTCC7b9-Jp2G7G2QVCr27_8Bk0dPfpmdmni-AY5rYcfwXIaLZBijapoMCkHU_hYdb3c233Qa-7KVOJx081qrR63W_1mdvjOZ-9sv-YfdC-nzUCaMuQxBXumTV4b6TngIaj_D5qHsDqqrYfPw1AktKP5v_0LK5Q" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 速查表

| 语法 | 功能 |
|------|------|
| `sequenceDiagram` | 声明时序图 |
| `participant A` | 声明参与者 |
| `participant A as 别名` | 带别名的参与者 |
| `actor A` | 小人图标参与者 |
| `A->>B: msg` | 实线带箭头 |
| `B-->>A: msg` | 虚线带箭头 |
| `A-)B: msg` | 异步消息 |
| `Note over A,B: text` | 横跨备注 |
| `loop 条件 ... end` | 循环块 |
| `alt/else/end` | 条件分支 |
| `opt 条件 ... end` | 可选操作 |
| `par/and/end` | 并行操作 |

## 下一步

了解时序图后，继续学习 [Mermaid 甘特图](gantt.html)，用于展示项目任务与时间线安排。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
