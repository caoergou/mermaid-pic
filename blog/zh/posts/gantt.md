---
title: 如何用 Mermaid 画甘特图
description: 掌握甘特图的任务声明、日期格式、依赖关系、关键路径标记，以产品迭代计划为例演示项目管理场景。
date: 2026-03-04
slug: gantt
---

# 如何用 Mermaid 画甘特图

<span class="post-meta">2026-03-04 · MermZen 教程

甘特图（Gantt Chart）以横向条形展示项目任务的时间安排，直观呈现任务的开始时间、持续时长和相互依赖关系。适合项目管理、迭代排期、发布计划等场景。

## 基本结构

一个完整的甘特图声明包含三个要素：

```
gantt
    title 我的项目计划
    dateFormat YYYY-MM-DD
    section 第一阶段
    任务名称 : 2026-03-01, 5d
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJU1BQUCjJLMlJVXjWMfH5rJaXC3c-n73uxbqFTzsmQWRTEktS3fKLchNLFCIjIyN1fX11XVwgUsWpySWZ-XkKz9esebKj4eWMbc_WbYXIPNm9-2nXwqcTep8v36BgpWBkYGSma2Csa2Coo2CaolQLACOyOI0" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

- `title` — 图表标题（可选）
- `dateFormat` — 日期格式，**必须与任务日期格式一致**
- `section` — 任务分组标题，一个甘特图可以有多个 section
- 任务行：`任务名 : 开始日期, 持续天数`

## 日期格式

`dateFormat` 支持多种格式，推荐使用 `YYYY-MM-DD`：

| 格式 | 示例 |
|------|------|
| `YYYY-MM-DD` | `2026-03-01` |
| `DD/MM/YYYY` | `01/03/2026` |
| `MM-DD-YYYY` | `03-01-2026` |

## 任务定义详解

### 指定开始日期和持续时长

```
gantt
    dateFormat YYYY-MM-DD
    section 开发
    需求分析 : 2026-03-01, 3d
    UI 设计  : 2026-03-04, 5d
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJU1BQUEhJLEl1yy_KTSxRiIyMjNT19dV1cYFIFacml2Tm5yk83dPwtH8iROzlnIZnG5uedrQ9mzdBwUrByMDITNfAWNfAUEfBOAWiJNRT4cW6fS_WLVRAVmCio2CaolQLAP3CLRU" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

持续时长单位：`d`（天）、`w`（周）、`h`（小时）

### 任务依赖（after 关键字）

```
gantt
    dateFormat YYYY-MM-DD
    section 开发
    后端开发  : be, 2026-03-01, 7d
    前端开发  : after be, 5d
    联调测试  : after 前端开发, 3d
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJU1BQUEhJLEl1yy_KTSxRiIyMjNT19dV1cYFIFacml2Tm5yk83dPwtH8iROzphL7nq9dDRBQUrBSSUnUUjAyMzHQNjHUNDHUUzFOg6jp7UdQlppWkFoFVm0JVvGic8mJD87Ot3S_WT0WoQNano2CcolQLAA6XSH0" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

`after 任务名` 表示在指定任务完成后才开始，实现依赖链。给任务指定 ID（如 `be`），方便其他任务引用。

### 任务状态标记

```
gantt
    dateFormat YYYY-MM-DD
    section 进度
    已完成任务  : done,   2026-03-01, 3d
    进行中任务  : active, 2026-03-04, 5d
    普通待办    :         2026-03-09, 4d
    关键路径    : crit,   2026-03-09, 3d
    关键且进行中: crit, active, 2026-03-09, 3d
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJU1BQUEhJLEl1yy_KTSxRiIyMjNT19dV1cYFIFacml2Tm5ym82D_76a5lELGn2zc9XdfzrGPCk927n3YtVFCwUkjJz0vVUVBQMDIwMtM1MNY1MNRRME6BKH-xf_aLhT1PdqxFKE9MLsksS9VBKDfRUTCFKn82c93LhllP97U-7ZoH4lspwABctaWOgglU9dPWzS-nrHuxff3TfS0Q1clFmSU6aKqNUVQ_2TEF7iaYegwXgXUp1QIAKxFvpQ" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| 状态标记 | 视觉效果 |
|---------|---------|
| `done` | 灰色（已完成） |
| `active` | 蓝色高亮（进行中） |
| `crit` | 红色（关键路径） |
| `milestone` | 菱形里程碑节点 |
| 不标记 | 默认颜色（待开始） |

### 里程碑（milestone）

```
gantt
    dateFormat YYYY-MM-DD
    section 发布
    开发完成    : milestone, m1, 2026-03-15, 0d
    上线发布    : milestone, m2, 2026-03-20, 0d
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJU1BQUEhJLEl1yy_KTSxRiIyMjNT19dV1cYFIFacml2Tm5yk87Z_4dEczROzpngYQd13Ps44JIL6VQm5mTmpxSX5eqo5CrqGOgpGBkZmugbGuoamOgkEKRNOTHV3Pd-2HGIOpyQihycgApEmpFgBDcTs8" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

里程碑用 `0d` 持续时间表示一个时间点，而非时间段。

### 排除工作日

```
gantt
    dateFormat YYYY-MM-DD
    excludes weekends
    excludes 2026-04-04, 2026-04-05
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKT8wrKYnJU1BQUEhJLEl1yy_KTSxRiIyMjNT19dV1cYFIpVYk55SmpBYrlKemZqfmpRSjCRsZGJnpGpjoGpjoINimSrUAvVge6A" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

`excludes weekends` 自动排除周六周日，也可以指定具体假期日期。

## 完整示例：产品迭代计划

```
gantt
    title MermZen 博客功能 v1.0 计划
    dateFormat YYYY-MM-DD
    excludes weekends

    section 需求与设计
    需求评审        : done,   req,    2026-03-01, 2d
    UI 原型设计     : done,   ui,     after req,  3d
    设计评审        : milestone,      after ui,   0d

    section 开发
    博客模板开发    : active, tpl,    after ui,   4d
    文章内容编写    :         art,    after ui,   6d
    Actions CI 配置 :         ci,     after tpl,  2d

    section 测试与上线
    功能测试        : crit,   test,   after ci,   3d
    性能检查        : crit,           after test, 1d
    正式上线        : milestone,      after 性能检查, 0d
```
<a href="https://eric.run.place/MermZen/#eJyFkVFLwlAUx7_KYc9bzBk--BZF4IOPPSx8GdstRjpru1oQwai0UFQKEorKlkRBNOkhsND8Mt5tfotwZ5rpQ_flwjn39z___7mHXJFLSjynckluWzEozRgAAFSnWQJpYuY2iQGsdsPcR1ZpBSd9KMaWRAhch51f4ltNoWQ9b-YUCrIsy0I6LaytYYscqNmCRizYJ2SHGJqVMbBhEZXqeQNGt7b3fjzs1gP3O3AdbGIx6Jwy14HoJEHLG4QHAJPsjS-QRCkhiHFBjPEgaUhupIDVW-y-inJzZEEPQVC2KDEjnXhEIjA_M6dniUUjfEqijqjNh2E9mzUusIYr814c726AdVRUVKoXCQ90N8vPKy5HXrzmmf_6wMol5n76vSYrXyM7OYpJF9hExK6EVixYTcGoVPP77gyn_smPDqSFFN5HNehcDbv1Ybfifw2iOOHfY-t3Paqph04oscIbhXHMZLGe_Twm27bXelokp5HQUqgTm5BvbdZroIv_vmR2Cg-ixh39AFPuD8E" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 速查表

| 语法 | 功能 |
|------|------|
| `gantt` | 声明甘特图 |
| `title 标题` | 图表标题 |
| `dateFormat YYYY-MM-DD` | 日期格式 |
| `excludes weekends` | 排除周末 |
| `section 名称` | 任务分组 |
| `任务名 : 日期, Nd` | 指定开始日期 |
| `任务名 : after 任务ID, Nd` | 依赖前置任务 |
| `任务名 : id, 日期, Nd` | 带 ID 的任务 |
| `:done` | 已完成（灰色） |
| `:active` | 进行中（蓝色） |
| `:crit` | 关键路径（红色） |
| `:milestone` | 里程碑节点 |

## 下一步

了解甘特图后，继续学习 [Mermaid 类图](class.html)，用于描述面向对象的系统结构。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
