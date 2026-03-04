---
title: How to Draw Pie Charts in Mermaid
description: Learn how to create pie charts in Mermaid. The simplest diagram type - just three lines of code.
date: 2026-03-04
slug: pie
---

# How to Draw Pie Charts in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial</span>

Pie charts visualize proportions of a whole. They are ideal for showing traffic sources, time allocation, or budget distribution.

## Basic Syntax

```
pie title My Pie Chart
    "Category A" : 25
    "Category B" : 35
    "Category C" : 40
```

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

### Development Time Allocation

```
pie title Development Time Distribution
    "Requirements" : 15
    "Frontend" : 35
    "Backend" : 25
    "Testing" : 15
    "Documentation" : 10
```
