---
title: 如何用 Mermaid 画甘特图
description: 用 Mermaid 快速制作项目甘特图，掌握任务声明、时间格式、依赖关系语法，含完整项目计划示例。
date: 2026-03-04
slug: gantt
---

## 什么是甘特图？

甘特图（Gantt Chart）以横向条形展示项目任务的时间安排，直观呈现任务的开始时间、持续时长和相互依赖关系。适合项目管理、迭代计划、发布排期等场景。

## 基本语法

### 声明图表

```
gantt
    title 项目计划
    dateFormat YYYY-MM-DD
    section 第一阶段
```

- `title` — 图表标题（可选）
- `dateFormat` — 日期格式，常用 `YYYY-MM-DD`
- `section` — 任务分组标题

### 声明任务

```
gantt
    dateFormat YYYY-MM-DD
    section 开发
    需求分析    : 2026-03-01, 3d
    UI 设计     : 2026-03-04, 5d
    前端开发    : after UI 设计, 7d
    后端开发    : 2026-03-04, 10d
```

任务有两种写法：

| 写法 | 含义 |
|------|------|
| `任务名 : 开始日期, Nd` | 从指定日期开始，持续 N 天 |
| `任务名 : after 任务名, Nd` | 在某任务完成后开始 |

### 任务状态与关键路径

```
gantt
    dateFormat YYYY-MM-DD
    已完成     :done,   2026-03-01, 3d
    进行中     :active, 2026-03-04, 5d
    待开始     :        2026-03-09, 4d
    关键任务   :crit,   2026-03-09, 3d
```

在任务名后加状态标记：`done`（完成）、`active`（进行中）、`crit`（关键路径，红色高亮）。

## 完整示例：产品迭代计划

```
gantt
    title MermZen 博客功能迭代计划
    dateFormat YYYY-MM-DD
    excludes weekends

    section 设计阶段
    需求评审        :done,   req,    2026-03-01, 2d
    UI 设计         :done,   ui,     after req,  3d

    section 开发阶段
    博客页面开发    :active, blog,   after ui,   5d
    Actions 配置    :        ci,     after blog, 2d

    section 测试与发布
    功能测试        :crit,   test,   after ci,   3d
    上线发布        :crit,           after test, 1d
```

<a href="https://caoergou.github.io/mermzen/" target="_blank" class="try-in-editor">在 MermZen 中试试 →</a>

## 常用语法速查

| 语法 | 含义 |
|------|------|
| `gantt` | 声明甘特图 |
| `title 标题` | 图表标题 |
| `dateFormat YYYY-MM-DD` | 日期格式 |
| `excludes weekends` | 排除周末 |
| `section 名称` | 分组标题 |
| `:done` | 已完成（灰色） |
| `:active` | 进行中（蓝色） |
| `:crit` | 关键路径（红色） |
| `after 任务名` | 在某任务后开始 |

## 下一步

了解甘特图后，继续学习 [Mermaid 类图](class.html)，用于描述面向对象设计中的类结构与关系。
