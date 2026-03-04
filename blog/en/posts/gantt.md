---
title: How to Draw Gantt Charts in Mermaid
description: Complete tutorial on Gantt charts in Mermaid, covering task dependencies, critical path marking, milestones, and weekend/holiday exclusion.
date: 2026-03-04
slug: gantt
---

# How to Draw Gantt Charts in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial</span>

Gantt charts visualize project tasks as horizontal bars, showing start/end dates and dependencies. They are essential for project planning, sprint scheduling, and release management.

## Basic Structure

```
gantt
    title My Project Plan
    dateFormat YYYY-MM-DD
    section Phase 1
    Task name : 2026-03-01, 5d
```

- `title` - Optional
- `dateFormat` - Required (YYYY-MM-DD recommended)
- `section` - Grouping for tasks
- Duration units: `d` (days), `w` (weeks), `h` (hours)

## Task Dependencies

```
gantt
    dateFormat YYYY-MM-DD
    section Development
    Backend  : be, 2026-03-01, 7d
    Frontend : after be, 5d
    QA       : after Frontend, 3d
```

`after id` starts a task after another completes.

## Task States

```
gantt
    dateFormat YYYY-MM-DD
    Completed   : done,   2026-03-01, 3d
    In progress : active, 2026-03-04, 5d
    Pending     :         2026-03-09, 4d
    Critical    : crit,   2026-03-09, 3d
```

## Full Example: Product Iteration

```
gantt
    title MermZen Blog Feature v1.0
    dateFormat YYYY-MM-DD
    excludes weekends

    section Design
    Requirements    : done,   req,    2026-03-01, 2d
    UI prototyping  : done,   ui,     after req,  3d

    section Development
    Template dev    : active, tpl,    after ui,   4d
    Article writing :         art,    after ui,   6d
    CI setup        :         ci,     after tpl,  2d

    section Launch
    QA testing      : crit,   test,   after ci,   3d
    Launch          : milestone,      after test, 0d
```
