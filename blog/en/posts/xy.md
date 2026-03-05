---
title: How to Draw XY Charts in Mermaid
description: Comprehensive guide to Mermaid XY chart syntax including axis configuration, data points, and trend visualization with sales vs profit relationship example.
date: 2026-03-05
slug: xy
---

# How to Draw XY Charts in Mermaid

<span class="post-meta">2026-03-05 · MermZen Tutorial

XY charts (scatter plots) visualize relationships between variables, data distributions, and trends. They are ideal for data analysis, statistical visualization, and scientific research. Mermaid uses `xyChart` keyword for XY charts.

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslKqqHTOSCwqiclTUFBQKMksyUlVAAsohIDYEOEK3cSKzGKFCAjlk5iUmgORqISIRCJJKNUCAGsoHfE" width="100%" height="600" frameborder="0"></iframe>

## Declaring a Chart

Use `xyChart` keyword:

```
xyChart
    title Chart Title
    x-axis X-axis Label
    y-axis Y-axis Label
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslKqqHTOSCwqiclTUFBQKMksyUlVAAsohIDYEOEK3cSKzGKFCAjlk5iUmgORqISIRCJJKNUCAGsoHfE" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Basic Data Points

Add data points and configure axes:

```
xyChart
    title Sales vs Profit Relationship
    x-axis Sales (10,000 yuan)
    y-axis Profit (10,000 yuan)
    data "2023"
        40:25
        50:30
        60:35
        70:40
        80:45
        90:50
    data "2024"
        50:35
        60:42
        70:48
        80:55
        90:62
        100:70
```
<a href="https://eric.run.place/MermZen/#eJxtjUEKwjAQRa8yZKVQ4TdNWp2tFxDddhO00kBppYmlRby7SApNxdnNvD_vv8QgWCbiKliM07E2vS9bIiJvfVPRxTSVo8HRqe_u1tO5aoy3Xetq-wi5cWdG6-bgJkUCgKanabeBT4HP_38CN-MNlUJCZqUIp-8osNTLqsEZljUHZxEtwCqie7CK6AGs8Vum4jK91uVgJdf2_cqu1_Y8CqcAFxDvD5lQUuI" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Multiple Datasets

Add multiple datasets for comparison:

```
xyChart
    title Product Sales vs Price Relationship
    x-axis Price (yuan)
    y-axis Sales (units)
    data "Product A"
        100:1000
        150:800
        200:600
        250:400
        300:200
    data "Product B"
        150:900
        200:850
        250:700
        300:500
        350:300
    data "Product C"
        200:1200
        250:1100
        300:950
        350:800
        400:600
```
<a href="https://eric.run.place/MermZen/#eJx1j0EKgzAQRa8yZNVCCxM1rc6u9QLSbt0EDRiQWDSKUnr3IqlgAp3l-8P7M282MYpOrGLE5iVvZG9LAwBgtW0VFH1Xj5WFp2zVANMARa8rBQ_VSqs7MzT65dbns5z1Fh-WUZqjCxYXOMFhNNoOv6SWVkLJtopbyRxfhyMSR8QdEUjpHkSIdPGAQEr2IEakaANB291rE0hZ6E5F4L6GbuEBgRT_Kcv3ZaubR-HhnIf2TAR27_vEfc8-X0CabWE" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Full Example: User Activity Analysis

```
xyChart
    title User Activity vs Usage Duration
    x-axis Daily Usage (minutes)
    y-axis Activity Score
    data "New Users"
        5:25
        10:40
        15:55
        20:65
        25:75
        30:80
    data "Active Users"
        15:60
        25:75
        35:85
        45:90
        55:95
        65:98
    data "Dormant Users"
        3:15
        8:25
        12:35
        18:45
        22:50
        28:55
```
<a href="https://eric.run.place/MermZen/#eJx1j0FrwzAMhf-K8GmDDhwnyhzdynLeZfSWi8nMZmgTsNUsofS_j9alUyjT7dN70pNOalJkNqpXpObl7dtF7gYAAA6897BLPsK25zAFXmBKsEvuy0N7jI7DOGTr_OLmkKB1Yb_cDE-HMBzZp-fsWLLjvuijH6PP0qdjB5169z_XsNSp3L8UksE_KjRVWiASCtVoqiUivQosNVm9Crze4h8zC6Ra_78HyQqskBphRqRGqDVSY1eh7RgPbuDH1JIKMWjXfxsqJVqq5KOGUN5rCVGdfwHGh3Ug" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Quick Reference

| Syntax | Function |
|--------|----------|
| `xyChart` | Declare XY chart |
| `title Title` | Set chart title |
| `x-axis Label` | Set X-axis label |
| `y-axis Label` | Set Y-axis label |
| `data "Dataset Name"` | Declare dataset |
| `x:y` | Add data point |
| `%% comment` | Line comment |

## Next Step

After mastering XY charts, continue learning [Mermaid Architecture Diagrams](architecture.html) for system architecture design and component relationship visualization.

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
