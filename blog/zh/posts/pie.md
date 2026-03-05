---
title: 如何用 Mermaid 画饼图
description: 三行代码生成 Mermaid 饼图，快速可视化数据占比，含语法说明与实用示例。
date: 2026-03-04
slug: pie
---

## 什么是饼图？

饼图（Pie Chart）直观展示各部分在整体中所占的比例，适合展示预算分配、用户来源分布、时间占比等数据。Mermaid 的饼图是所有图表类型中语法最简单的。

## 基本语法

```
pie title 标题
    "类别A" : 数值
    "类别B" : 数值
    "类别C" : 数值
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqyExVKMksyUlVeLag_eWiGTF5CgoKCjFKzzfuftqx2jFGScFK4dnUDU8b9qDKOOGUcUaSUaoFAEU-Lms" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

- `pie` — 声明饼图
- `title 标题` — 可选，图表标题
- `"名称" : 数值` — 每个扇区的名称和数值
- 数值无需加百分号，Mermaid 自动计算各类别占比

## 完整示例：开发时间分配

```
pie title 本月开发时间分配
    "需求分析" : 15
    "前端开发" : 35
    "后端开发" : 25
    "测试调试" : 15
    "文档撰写" : 10
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqyExVKMksyUlVeDZnzbM5HU_3NDztn_hs-raX07c87Wh72dobk6egoKAQo_RyTsOzjU1PO9qezZsQo6RgpWBoCpN62tn7fPV6iFawlDFCakIfqpQRXOrZ1u4X66e-2ND8Yv1UNAOfTWt_tnDxs0kbnrbNhEgZKNUCANTTUWI" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

<a href="https://eric.run.place/MermZen/" target="_blank" class="try-in-editor">在 MermZen 中试试 →</a>

## 再来一个示例：网站流量来源

```
pie title 网站月度流量来源
    "搜索引擎" : 42
    "直接访问" : 28
    "社交媒体" : 18
    "外链引用" : 12
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqyExVKMksyUlVeL534vPVM5_N6Xi6a9mzrY0v2_ufzV36bNeEmDwFBQWFGKVnE-Y837Lo6Z6pzyb3xSgpWCmYGMGkns_e8qxv6Yt1-19OXweWMrKASy3Z92TXkqerJj3ZOxksZQiXerpk2svJ-57umfp8ygqIlJFSLQBaOUe-" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

<a href="https://eric.run.place/MermZen/" target="_blank" class="try-in-editor">在 MermZen 中试试 →</a>

## 常用语法速查

| 语法 | 含义 |
|------|------|
| `pie` | 声明饼图 |
| `pie title 标题` | 带标题的饼图 |
| `"名称" : 数值` | 一个扇区（数值为相对比例） |

## 下一步

你已经掌握了 Mermaid 最常用的五种图表！回到 [教程首页](index.html) 回顾所有内容，或直接打开 [MermZen 编辑器](../index.html) 开始绘图。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
