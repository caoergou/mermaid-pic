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
