---
title: 如何用 Mermaid 画 XY 图
description: 深入讲解 Mermaid XY 图的坐标轴设置、数据点添加、趋势展示等语法，附销售额与利润关系的完整实战示例。
date: 2026-03-05
slug: xy
---

# 如何用 Mermaid 画 XY 图

<span class="post-meta">2026-03-05 · MermZen 教程

XY 图（散点图）用于展示两个变量之间的关系、数据分布和趋势，适合数据分析、统计可视化、科学研究等场景。Mermaid 使用 `xyChart` 关键字声明 XY 图。

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslKqqHTOSCwqiclTUFBQKMksyUlVeDp734uFK54taH-5aAZEvEI3sSKzWCFC4cXeLc8WtD9fuw8iXgkRj0SIK9UCALwcKGg" width="100%" height="600" frameborder="0"></iframe>

## 声明图表

使用 `xyChart` 关键字：

```
xyChart
    title 图表标题
    x-axis X 轴标签
    y-axis Y 轴标签
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslKqqHTOSCwqiclTUFBQKMksyUlVeDp734uFK54taH-5aAZEvEI3sSKzWCFC4cXeLc8WtD9fuw8iXgkRj0SIK9UCALwcKGg" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 基本数据点

添加数据点并设置坐标轴：

```
xyChart
    title 销售额与利润关系
    x-axis 销售额 (万元)
    y-axis 利润 (万元)
    data "2023年"
        40:25
        50:30
        60:35
        70:40
        80:45
        90:50
    data "2024年"
        50:35
        60:42
        70:48
        80:55
        90:62
        100:70
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslKqqHTOSCwqiclTUFBQKMksyUlVeDml4emUdS8XzX2yo-9px8pn25Y9bd38fPNuiJoK3cSKzGKEIgWNJzvan7Y2a0KkKyHSEH1ocimJJYkKMUpGBkbGT3duiVGCiIKAiYGVkSmCa2pgZWyA4JoZWBkjyZobWJkgyVoYWJkgyVoaWJkaoNtngmafKaqJZgZWJkaoFligWGCKaoEZkmJDAwMrcwOlWgCvQ2aD" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 多数据集

添加多个数据集进行比较：

```
xyChart
    title 产品销量与价格关系
    x-axis 价格 (元)
    y-axis 销量 (件)
    data "产品 A"
        100:1000
        150:800
        200:600
        250:400
        300:200
    data "产品 B"
        150:900
        200:850
        250:700
        300:500
        350:300
    data "产品 C"
        200:1200
        250:1100
        300:950
        350:800
        400:600
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslKqqHTOSCwqiclTUFBQKMksyUlVeLJr-dPJjS-nNLxs73-yo-_J7u3PFux52rr5-ebdEGUVuokVmcUKEAkFjaetzZoQiUqIBESrgsaT3dugEimJJYkKMUoQkxUcY5QgwiBgaGBgZWhgYIAkYmpgZYEsYGRgYGWGImBqYGWCLGBsYGBlBBNAtcwJxTJTAytLdKMtTNGMNkc32hRFwNTAyhi7Xc7IdoGMNjRCd7ahIbrhlqZohqP43QTid6VaAJx9fLo" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 完整示例：用户活跃度分析

```
xyChart
    title 用户活跃度与使用时长关系
    x-axis 每日使用时长 (分钟)
    y-axis 活跃度评分
    data "新用户"
        5:25
        10:40
        15:55
        20:65
        25:75
        30:80
    data "活跃用户"
        15:60
        25:75
        35:85
        45:90
        55:95
        65:98
    data "休眠用户"
        3:15
        8:25
        12:35
        18:45
        22:50
        28:55
```
<a href="https://eric.run.place/MermZen/#eJx1j8FKw0AQhl9l2ZMFhc0mEzf_1dfIJWjBgnjQICniSS05KYq2F0EvFW8VKlas0pdJNu1bSLuWTiid2zf_P_PPnMszCb0t9yVk1t47TE7S-FgIIdJWetQU1cObzUf2YzwdXZbfr8XXTfE7mTd7n7PHSXk9rIZj5892kqx1Kuzg1vb63CS2yrwzu39uOF_737dcOR1clXnHaQdJmohY2u67y42l68-LoGlFnkKgGBKIqVoh5EjYZegrGFUPXByznukRQrV5D8EwDAgRMxMhYmpIiEwttPi5q55e1kN9eGzO1N_W8DkaBPxPDeLnGhDJiz_0O56b" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 速查表

| 语法 | 功能 |
|------|------|
| `xyChart` | 声明 XY 图 |
| `title 标题` | 设置图表标题 |
| `x-axis 标签` | 设置 X 轴标签 |
| `y-axis 标签` | 设置 Y 轴标签 |
| `data "数据集名称"` | 声明数据集 |
| `x:y` | 添加数据点 |
| `%% 注释` | 行注释 |

## 下一步

掌握 XY 图后，继续学习 [Mermaid 架构图](architecture.html)，用于系统架构设计和组件关系可视化。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
