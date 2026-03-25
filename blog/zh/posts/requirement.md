---
title: 如何用 Mermaid 画需求图
description: 深入讲解 Mermaid 需求图的需求定义、关系描述、验证方法等语法，附软件项目需求管理的完整实战示例。
date: 2026-03-05
slug: requirement
---

# 如何用 Mermaid 画需求图

<span class="post-meta">2026-03-05 · MermZen 教程

需求图用于可视化项目需求、需求之间的关系和验证方法，适合需求管理、项目规划、软件开发生命周期管理等场景。Mermaid 使用 `requirementDiagram` 关键字声明需求图。

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslIqSi0szSxKzU3NK3HJTEwvSsyNyVNQUFAoySzJSVV4Oafh2camp7P3PVvQ_nLRDKVaAHSMGO4" width="100%" height="600" frameborder="0"></iframe>

## 为什么用需求图？

需求图在软件工程和项目管理中扮演着重要角色：

- **可视化需求层次和关系**：清晰展示需求之间的父子关系、依赖关系，帮助团队理解需求结构
- **追踪需求之间的依赖关系**：明确哪些需求依赖于其他需求，便于规划开发顺序和识别风险
- **管理"需求如何被验证"**：将验证方法与需求关联，确保每个需求都有对应的测试或审查方式

## 声明图表

使用 `requirementDiagram` 关键字：

```
requirementDiagram
    title 需求图标题
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqSi0szSxKzU3NK3HJTEwvSsyNyVNQUFAoySzJSVV4Oafh2camp7P3PVvQ_nLRDKVaAHSMGO4" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 需求定义

创建需求节点：

```
requirementDiagram
    title 基本需求图
    requirement "需求 1" {
        id: R1
        text: 用户可以登录系统
        type: functional
        status: approved
    }
    requirement "需求 2" {
        id: R2
        text: 用户可以查看个人信息
        type: functional
        status: pending
    }
    requirement "需求 3" {
        id: R3
        text: 系统应该具有响应式设计
        type: non-functional
        status: approved
    }
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqSi0szSxKzU3NK3HJTEwvSsyNyVNQUFAoySzJSVV4On_XszlrXs5peLax6ensfRApJC0KMUoQSQXDGCWFaog8CGSmWCkEGSL4JakVJVYKz6eseNax_Wn_-ie7lz6fufvp3qnPN-9-vns-krrKglQrhbTSvOSSzPy8xByETHFJYklpsZVCYkFBUX5ZagpEphaPk4ywOMkIn5OezV_6fE73kx2rnuza9WT_wmeN60lxWEFqXkpmXjphdxljcZcxhrvAAfN015QX65c-bd3-bE7n08m9T3dNebqn_8W6fS_WLUR3Wl5-ni4J4aZUCwCn48p7" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 需求管理实践

需求图支持三种主要的需求类型：

### 功能需求

系统必须实现的功能，描述系统"做什么"：

```
requirementDiagram
    title 功能需求示例
    requirement "用户认证" {
        id: FR-001
        text: 系统支持用户名密码登录
        type: functional
        status: approved
    }
```

### 非功能需求

性能、安全、可用性等方面的要求，描述系统"做得怎样"：

```
requirementDiagram
    title 非功能需求示例
    requirement "性能要求" {
        id: NFR-001
        text: 系统响应时间小于2秒
        type: non-functional
        status: approved
    }
```

### 约束需求

技术限制、预算、时间等外部条件：

```
requirementDiagram
    title 约束需求示例
    requirement "技术栈约束" {
        id: CON-001
        text: 必须使用React框架开发前端
    }
```

<iframe src="https://eric.run.place/MermZen/embed.html#eJwrSi0szSxKzU3NK3HJTEwvSszlUgCCksySnFSFJzs6ny_vfTmn4dnGpucbdz-d1w2WLELoUVB6sW7R096pT5e0PJ_QpqRQDVYAApkpVgpuhnBuSWpFiZXC8ykrnnVsf9q__snupU87Zj_dvetxQ-Oz-Uufz-kGMp72T3u2rQNiIEJjZUGqlUJaaV5ySWZ-XmIOWKIW0x1PJ_c-3TXl2fRtL6dvQXeHH4ZDXi7c-nLuoqddC17s3QvR83RD_5NdfcbPl09CszovP0-XsPXPuhqezVn_bEHH813Lns2dj-4CZ3QHPN3f-nLh7id79wODJCg1Mbnk2cK2Z_O2IRkPJtCCV1fXDt2nVgqZuQVA_cVcAEywwXU" width="100%" height="300" frameborder="0"></iframe>

## 需求关系

定义需求之间的关系：

```
requirementDiagram
    title 需求关系图
    requirement "登录功能" {
        id: R1
        text: 用户可以登录系统
    }
    requirement "个人信息管理" {
        id: R2
        text: 用户可以查看和编辑个人信息
    }
    requirement "响应式设计" {
        id: R3
        text: 系统在各种设备上都应该正常显示
    }

    "登录功能" --> "个人信息管理" : requires
    "登录功能" --> "响应式设计" : requires
    "个人信息管理" --> "响应式设计" : requires
```
<a href="https://eric.run.place/MermZen/#eJyFkMFKw0AQhl9l2bM9WG85ePIJPOdSNJSALRijCKWg1qpUS6tGUQyEYINFMEFyMCTN-jI7O9u3EF3UQmLc0yw733z7T4fuUa2-RDeoRi1je9e0jJbRttfMRtNqtPQ2IYTYpr1lkLl7IF6PoB9jnMEDU08LCNEp3meQ38DAk71cp6Sjej6PuamR9eXfu23s2xpBZyrO3mAU8SxQLMYZZp7q65YpePLM05S_--IwwtDH8UmJqF4lEl6A7jlcXeDsVrLLxYEVXrgeQurAbCRDJkO_RLpSkH5lAXcK42N8GsqQweSUJ4N5L4fUkVEgXh4hScQdw0n6o1ZFYZe12upf6bXvr-5UssUERbB0_v847X4A9eYV9g" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 需求验证方法

每个需求都应该可验证。Mermaid 需求图使用 `element` 节点和 `verifies` 关系来标注验证方法：

```
requirementDiagram
    title 需求验证方法示例
    requirement "用户登录" {
        id: R1
        text: 用户可以使用用户名密码登录
        type: functional
        status: approved
    }
    element "登录测试用例" {
        type: test
    }
    element "安全审查" {
        type: review
    }
    
    "登录测试用例" - verifies -> "用户登录"
    "安全审查" - verifies -> "用户登录"
```

<iframe src="https://eric.run.place/MermZen/embed.html#eJwrSi0szSxKzU3NK3HJTEwvSszlUgCCksySnFSFl3Manm1sermq58X6xmfTdj7bPPX5kl1P9nWDlRQhdCooPZ-y4lnH9uczdz_dO1VJoRqsAAQyU6wUggzh3JLUihIrBYjip_3rn-xe-mTvfiAXKjKh9-n6tucLGiHmIHRVFqRaKaSV5iWXZObnJebAJYpLEktKi60UEgsKivLLUlPAErVgMjUH5jKwWc-2dr9YPxVoDdD1yO6DGF2SWlyCTe_TdZ1PW1c8Xbfw2fylmLqKUssyU8uR9IEJrBbqKpSlFmWmZaYWK-jaoYUWRBeqVXjVAwCccLnv" width="100%" height="350" frameborder="0"></iframe>

常见的验证方法包括：

| 验证类型 | 说明 | 适用场景 |
|---------|------|---------|
| **测试** | 自动化测试、单元测试、集成测试 | 功能需求 |
| **审查** | 代码审查、设计审查、需求审查 | 非功能需求、架构需求 |
| **演示** | 向利益相关者演示功能 | 用户界面需求 |
| **分析** | 性能分析、安全分析 | 性能需求、安全需求 |

## 完整示例：软件项目需求管理

```
requirementDiagram
    title 电商系统需求图
    requirement "用户管理" {
        id: R1
        text: 用户可以注册、登录、修改个人信息
        type: functional
        status: approved
        priority: high
        verification: "用户测试"
    }
    requirement "产品展示" {
        id: R2
        text: 系统可以展示产品列表、详情和分类
        type: functional
        status: approved
        priority: high
        verification: "自动化测试"
    }
    requirement "购物车" {
        id: R3
        text: 用户可以添加、删除、修改购物车商品
        type: functional
        status: pending
        priority: medium
        verification: "手动测试"
    }
    requirement "支付功能" {
        id: R4
        text: 支持多种支付方式（支付宝、微信、信用卡）
        type: functional
        status: approved
        priority: high
        verification: "集成测试"
    }
    requirement "性能要求" {
        id: R5
        text: 系统响应时间应小于 2 秒
        type: non-functional
        status: approved
        priority: medium
        verification: "性能测试"
    }

    "用户管理" --> "产品展示" : requires
    "用户管理" --> "购物车" : requires
    "产品展示" --> "购物车" : requires
    "购物车" --> "支付功能" : requires
    "用户管理" --> "性能要求" : impacts
    "产品展示" --> "性能要求" : impacts
    "购物车" --> "性能要求" : impacts
    "支付功能" --> "性能要求" : impacts
```
<a href="https://eric.run.place/MermZen/#eJy9lMFu2kAQhl9l5XM5lLYXH3rqE_TMxQKHrBSMawxqFEXCQXUNgRIFE5omVWKJghupuChJ09gQHgbPrjnlFSpwCsg4QHuIT-ud-X_NN7O7O0yOYaPPmDjDMhL_LoslPsUL8hvMJSUuFRMQQkjG8haPqH4NdZVeOtQ5G53mSXcPTu78hDkhijFUN4l2QzsGPVBjDNrxc8YfTrDo7fPZv8y_l1nk50PVcp1v5NIEtTzMK_TYgX59mFfcQYfot-7vC9e23YFBFGtOvy3yLNrICnEZpwVuaxbJyJyczbCIE0UpneMTs4go4bSE5W0WbeLk5mw_x0t4A8e5sRM7pSDX-55VjzF-3m4Yrmu3oaZAt06bdghudAF30kEf11c9OGgNzzCHecWzWqTwAQ7LoKm06zwNrvfxAkomlI_WIPauftDid6_fCsF9sXS6Nw6Uzod5BbTz0XFzOt2pIdRVqCn_QizyQgILyTDgFJ_A2dTjyKS4DyVzDV6iW67zGUpnXqEfgvwyiEx0i5QVaH6h7YqvJUe30Kve97QHq87XcRPuOu7AmDTBoLoJFeO-V3yaaY9OVKIdrIOeb3uFvtdSSHcvBP3VI4e7VgFbJ41fo8YV2Dr8rLr2JxRFtH0Y5BPSQuR_GVcOeFL8AqW_WHinIpHXi7eZ_duPzFLV_I1YlAQ815HMR_38wCFcs7DA_FiEUyIXl5eXtkoUUtwKRaD45SJm9w_aZ9Ij" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 最佳实践

### 1. 每个需求有唯一 ID

使用有意义的 ID 命名规范，便于追踪和引用：

```
requirementDiagram
    requirement "用户管理模块" {
        id: R1
        text: 完整的用户管理功能
    }
    requirement "用户注册" {
        id: R1.1    ← 子需求使用父ID前缀
        text: 新用户可以注册账号
    }
```

### 2. 清晰定义需求状态

明确标注每个需求的当前状态：

- `approved` — 已批准，可以开始开发
- `pending` — 待审批，需要进一步讨论
- `rejected` — 已拒绝，不再考虑

### 3. 建立需求间的"包含"关系

使用 `contains` 关系组织需求层次：

```
requirementDiagram
    title 需求层次结构
    requirement "用户管理模块" {
        id: R1
        text: 完整的用户管理功能
        type: functional
    }
    requirement "用户注册" {
        id: R1.1
        text: 新用户可以注册账号
        type: functional
    }
    requirement "用户登录" {
        id: R1.2
        text: 已注册用户可以登录
        type: functional
    }
    requirement "密码重置" {
        id: R1.3
        text: 用户可以重置密码
        type: functional
    }
    
    "用户管理模块" - contains -> "用户注册"
    "用户管理模块" - contains -> "用户登录"
    "用户管理模块" - contains -> "密码重置"
```

<iframe src="https://eric.run.place/MermZen/embed.html#eJwrSi0szSxKzU3NK3HJTEwvSszlUgCCksySnFSFl3Manm1serqx6dmahc93T342rwUsWYTQo6D0fMqKZx3bn69b-HxC27MVC5_Ona6kUA1WBgKZKVYKQYZwbklqRYmVwtN1Pc-mbnk-qwVZ79Ou-S-a9yJUVhakWimkleYll2Tm5yXmgCVqcVn_bPOKp209mBbroVv9bNoGiI6n_euf7F4K0fdiy7Kn_dvJtPr5zN1P907FYrURuq-3b4JYh-wAiG6SrX66vu35gsaX7b3P967DYrUxmtXINkI0QQwgxl4wgTWWdRWS8_NKEjPzihV07dBigkRd0EAkWheK_7kAu2oswA" width="100%" height="400" frameborder="0"></iframe>

### 4. 为非功能需求设置验证标准

非功能需求（性能、安全等）必须有明确的验证标准：

```
requirementDiagram
    requirement "响应时间" {
        id: NFR-001
        text: 页面加载时间小于3秒
        type: non-functional
        verification: "性能测试"
    }
```

## 与其他图表对比

### 需求图 vs 用例图

| 特性 | 需求图 | 用例图 |
|------|--------|--------|
| **侧重点** | 需求层次和验证方法 | 用户与系统的交互 |
| **主要元素** | 需求节点、验证元素 | 参与者、用例、关系 |
| **适用场景** | 需求管理、项目规划 | 需求分析、系统设计 |
| **关系类型** | requires、contains、verifies | include、extend、generalize |

**需求图**强调需求之间的层次关系和验证方法，适合项目经理和需求工程师使用。

**用例图**强调用户如何与系统交互，适合需求分析和系统设计阶段。

### 需求图 vs 类图

| 特性 | 需求图 | 类图 |
|------|--------|------|
| **侧重点** | 需求层次结构 | 系统结构设计 |
| **主要元素** | 需求、元素 | 类、接口、关系 |
| **适用阶段** | 需求阶段 | 设计阶段 |
| **目的** | 理解和管理需求 | 指导代码实现 |

**需求图**是需求层次的抽象，描述"系统应该做什么"。

**类图**是系统结构的抽象，描述"系统如何实现"。

## 速查表

| 语法 | 功能 |
|------|------|
| `requirementDiagram` | 声明需求图 |
| `title 标题` | 设置图表标题 |
| `requirement "名称" { ... }` | 定义需求 |
| `id: 标识符` | 设置需求唯一标识符 |
| `text: 描述` | 设置需求描述文本 |
| `type: 类型` | 设置需求类型（functional/non-functional） |
| `status: 状态` | 设置需求状态（approved/pending/rejected） |
| `priority: 优先级` | 设置需求优先级（high/medium/low） |
| `verification: 方法` | 设置验证方法 |
| `"需求 1" --> "需求 2" : 关系` | 定义需求之间的关系 |
| `%% 注释` | 行注释 |

## 下一步

掌握需求图后，您可以继续学习其他 Mermaid 图表类型，或查看我们的 [Mermaid 图表速查表](../cheat-sheet.html) 获取完整的语法参考。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
