---
title: How to Draw Pie Charts in Mermaid
description: Learn how to create pie charts in Mermaid. The simplest diagram type - just three lines of code.
date: 2026-03-04
slug: pie
---

# How to Draw Pie Charts in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial

Pie charts visualize proportions of a whole. They are ideal for showing traffic sources, time allocation, or budget distribution.

## Basic Syntax

```
pie title My Pie Chart
    "Category A" : 25
    "Category B" : 35
    "Category C" : 40
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqyExVKMksyUlV8K1UCMhMVXDOSCwqiclTUFBQiFFyTixJTc8vqlRwjFFSsFIwMsWQcAJLGGNKOIMlTAyUagEN_R95" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

Key features:
- `pie title` adds a chart title
- Values don't have to sum to 100 - Mermaid calculates percentages
- Use `showData` to display exact percentages
- Use `textPosition` to customize labels

## Examples

### Traffic Sources

```
pie title Monthly Traffic Sources
    "Organic Search" : 42
    "Direct" : 28
    "Social" : 18
    "Referral" : 12
```
<a href="https://eric.run.place/MermZen/#eJw9ybEKwjAQBuBX-bnZxeAgmV2l0DpmCcfFHoREzigU8d1LC-n6fT_6kncnYvL0UkHTlgX3WtqcFzwspqSMqX6M5R0KAAQa7BnLxhKN50DwuLieNzXhtqO7dpwqa8w7ng8cJYlZZ0f_FQuYKZw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

### Development Time Allocation

```
pie title Development Time Distribution
    "Requirements" : 15
    "Frontend" : 35
    "Backend" : 25
    "Testing" : 15
    "Documentation" : 10
```
<a href="https://eric.run.place/MermZen/#eJxdjTEOwjAQBL-yupoCgmhcIosHoJRpgjmhE8k52Oc0EX9HsZQUtDOr2YVmcs2BAjmahGFiA8PzzEOcRlZDKyPDS7Ykj2IStVMA6OjOnyKJ11HuCA6ny6ZuKaqxPis-7_jah_dGm522nE309ZfwMZQ13dfL6o70_QHyzjVC" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
