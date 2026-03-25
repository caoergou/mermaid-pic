---
title: 如何用 Mermaid 画架构图
description: 深入讲解 Mermaid 架构图的组件定义、接口描述、部署模式等语法，附微服务架构的完整实战示例。
date: 2026-03-05
slug: architecture
---

# 如何用 Mermaid 画架构图

<span class="post-meta">2026-03-05 · MermZen 教程

架构图用于可视化系统架构、组件关系、部署模式等，适合系统设计、架构评审、技术文档等场景。Mermaid 使用 `architecture-beta` 关键字声明架构图。

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTslIw0lFQSgbSSolFyRmZJanJJaVFqbpJqSWJMXkKQFCSWZKTqhBTap6clgQkU1PSYkrNzJPMQKSFSUypqVlaqlItAIWOGBk" width="100%" height="600" frameborder="0"></iframe>

## 为什么用架构图？

架构图是系统设计和文档编写的核心工具：

- **可视化系统结构** — 一眼看出系统由哪些组件构成，它们如何交互
- **架构评审利器** — 在设计阶段发现潜在问题，避免后期返工
- **团队沟通桥梁** — 让新成员快速理解系统全貌，减少沟通成本
- **技术文档核心** — 作为架构设计文档的视觉化呈现

### 适用场景

✅ **适合**：
- 系统设计阶段 — 规划整体架构
- 架构评审 — 与团队讨论设计决策
- 技术文档 — 记录系统结构
- 新人入职 — 快速了解系统全貌

❌ **不适合**：
- 展示代码逻辑流程 → 用流程图
- 展示时间序列 → 用时序图
- 展示单一模块内部 → 用类图

## 与其他图表对比

| 图表类型 | 核心用途 | 与架构图的区别 |
|---------|---------|---------------|
| **架构图** | 系统组件与部署 | 强调组件层次、外部依赖、部署模式 |
| **块图** | 模块结构 | 更通用，适合网络拓扑、工业流程 |
| **流程图** | 流程与决策 | 强调步骤顺序，无组件层次概念 |

**选择建议**：
- 展示"系统有哪些组件、如何连接" → 架构图
- 展示"模块嵌套结构" → 块图
- 展示"操作流程和决策分支" → 流程图

## 声明图表

使用 `architecture-beta` 关键字：

```
architecture-beta
    title 系统架构图
```
<a href="https://eric.run.place/MermZen/#eJyrVipTslIw0lFQSgbSSolFyRmZJanJJaVFqbpJqSWJMXkKQFCSWZKTqhBTap6clgQkU1PSYkrNzJPMQKSFSUypqVlaqlItAIWOGBk" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 组件定义

定义系统组件，包括服务、数据库、外部系统等：

```
architecture-beta
    title 基础架构组件
    container "前端应用" {
        component "用户界面"
        component "API 调用"
    }
    container "后端服务" {
        component "业务逻辑"
        component "数据访问"
    }
    database "数据库" {
        component "用户数据"
        component "业务数据"
    }
    system "外部支付系统"
```
<a href="https://eric.run.place/MermZen/#eJyFz8FKw0AQgOFXGebsyWNveuvNB9jLGhcM2K0kqyClUGgPWhpRTFVEWyIeAoWkIFTJgr5Mdid5C9EVQWnwPB_zz_TwGFubG-hhC3ng7ftKeOooENtCcSYBAJSvDgSYeUHJwM5WdjYiPSr1yk29rlTclyIAhuYsokVuipjilCH0nHCqc9iVQipgSHFqT19oOqkfHhmuN1s7baiWw689TvTX5C7OaZHb-8iMk-Zc-Xpnxkk90NXbZVPOTpc2yqrsvb7J_gT3uOK7PBQ_yhRX__3mYFPMHfTbfMfCk1CJzudrT9f1MLVxXupbetak5wyx_wFGgLXU" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 连接关系

定义组件之间的连接和依赖关系：

```
architecture-beta
    title 组件关系图
    container "前端应用" {
        component "用户界面"
        component "API 调用"
    }
    container "后端服务" {
        component "业务逻辑"
        component "数据访问"
    }
    database "数据库" {
        component "用户数据"
        component "业务数据"
    }
    system "外部支付系统"

    "用户界面" --> "API 调用"
    "API 调用" --> "业务逻辑"
    "业务逻辑" --> "数据访问"
    "数据访问" --> "用户数据"
    "数据访问" --> "业务数据"
    "业务逻辑" --> "外部支付系统"
```
<a href="https://eric.run.place/MermZen/#eJyFkE9LwzAYxr_KS87u4nEHQW_e_AC5xBqw4DJpoyBjIExBhxXFTsU_yMRDYdAOClMWmF-mSdpvITNFWEnw-uRHfu_z9NAxaq-vIQ-1EQm8fZ9Tjx8FdItyghkAAPf5AQUtzgoxk-e5zoV8Xpgnr8s48RkNACN5GelJJuexjhOMoGcIQ3UOu4wyDhjpOFEXn3p0Vb2-Y2RnNne2oZwOfv8xRN-iu7nWk0y9RHI4duuKryc5HFenolzcunRqNFVRWqbf1UPaEO4RTnZJSP8oOb_7r5sBXTJz0CpTy8KTkNPOstrHfTVIVJwV4lHnQou3JWmg5oLQam1YJ1vNasw2RzOtUdsqzbRGbb0dqK2-4wDbCqj_A8f4Mvg" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 完整示例：微服务架构

```
architecture-beta
    title 电商系统微服务架构
    container "用户界面层" {
        component "Web 端"
        component "移动端"
        component "管理后台"
    }
    container "API 网关" {
        component "请求路由"
        component "身份验证"
        component "限流熔断"
    }
    container "业务服务层" {
        component "用户服务"
        component "产品服务"
        component "订单服务"
        component "支付服务"
        component "库存服务"
    }
    database "数据存储" {
        component "MySQL 主库"
        component "MySQL 从库"
        component "Redis 缓存"
    }
    system "外部系统" {
        component "支付宝"
        component "微信支付"
        component "物流系统"
    }

    "Web 端" --> "API 网关"
    "移动端" --> "API 网关"
    "管理后台" --> "API 网关"

    "API 网关" --> "用户服务"
    "API 网关" --> "产品服务"
    "API 网关" --> "订单服务"
    "API 网关" --> "支付服务"
    "API 网关" --> "库存服务"

    "用户服务" --> "MySQL 主库"
    "用户服务" --> "Redis 缓存"
    "产品服务" --> "MySQL 主库"
    "产品服务" --> "Redis 缓存"
    "订单服务" --> "MySQL 主库"
    "库存服务" --> "MySQL 主库"

    "支付服务" --> "支付宝"
    "支付服务" --> "微信支付"
    "订单服务" --> "物流系统"
```
<a href="https://eric.run.place/MermZen/#eJx9k01LAkEYx7_KMOe8dOwQ1C0o6OXQZS-rDiTUFjoFIh20khItwzUqesEIssRdJUxx077Mzsz6LWIbFXebmdvC_nie__PnNxl4BBfm52AMLkA9GdtJYBTDh0m0jLCuGQAAgBN4FwFmdkg1zz4d5jyToUUfSqRQo09f9OmUY7F9A-sJAyWBBplZp-ddVi2OHl9IO6dBkOEQB_cO9g1kYKDBbRQFrGFrUPybvTmkUFcBVo2V86R8Sa5aE-b4f56l9RXABtfk7FMexbO7tJ3zujYz27J1Xr_hOoPRR9GzszJmdFemnSzLm_SmqYjk9u79Av9qVFbEu-SgbKfbfyOVrJrxrBdSqqoZatquc6tmSL9CmiFmfF9cx3pUTyF_UrVFSxZp3pJcXX7bWnprYxW4PYf0K7J9Y8a5VDCbKJ5IAfbtJwtlSqVTGO35uV9vRid1LrA8EW-AWI_S84eW-1PjmNTKi3dfgfGqaRz-MSM9iEQWQ3ZOmBnzVVRAfyE4QQNPgIMis4SgSC8hKHJMCIpEE4Jh26aXB7KPYZFOElRkTPhQ5VQhKp4abEU5NXiuBJ3AwRIDzc4ILOFEHkuiBnWGx79SB6Rl" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 最佳实践

### 组件组织原则

- **按层次组织**：用户界面层 → API网关 → 业务服务层 → 数据存储
- **保持组件粒度一致**：同一层级的组件应该处于相同的抽象层次
- **区分内外**：用 `container` 表示内部组件，用 `system` 表示外部系统

### 连接关系建议

- **避免过度连接**：单个组件的连接数建议不超过 5 个
- **方向清晰**：使用 `-->` 明确表示数据/调用流向
- **层次分明**：先定义高层连接，再定义内部连接

### 命名规范

| 元素 | 规范 | 示例 |
|------|------|------|
| Container | 按功能/层次命名 | `用户界面层`、`API 网关` |
| Component | 按具体职责命名 | `请求路由`、`身份验证` |
| Database | 按存储类型命名 | `MySQL 主库`、`Redis 缓存` |
| System | 按外部服务名命名 | `支付宝`、`微信支付` |

## 常见误区

### 误区一：连接过多导致图表混乱

❌ **问题**：所有组件之间都画连线，图表变成"意大利面"

✅ **解决**：只画主要的调用关系，次要关系用文字说明或拆分为多个图表

### 误区二：抽象层次不一致

❌ **问题**：同一层级混杂"用户服务"和"getUser API"这种不同层次的组件

✅ **解决**：保持同一层级的组件处于相同的抽象层次

### 误区三：忽略数据流向

❌ **问题**：只画组件，不画它们之间的数据/调用流向

✅ **解决**：使用 `-->` 明确标注调用方向，让架构图体现实际的系统交互

## 速查表

| 语法 | 功能 |
|------|------|
| `architecture-beta` | 声明架构图 |
| `title 标题` | 设置图表标题 |
| `container "名称" { ... }` | 定义容器组件 |
| `component "名称"` | 定义内部组件 |
| `database "名称" { ... }` | 定义数据库组件 |
| `system "名称"` | 定义外部系统 |
| `"组件1" --> "组件2"` | 定义组件之间的连接 |
| `%% 注释` | 行注释 |

## 下一步

掌握架构图后，继续学习 [Mermaid 块图](block.html)，用于更复杂的系统架构和流程图可视化。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
