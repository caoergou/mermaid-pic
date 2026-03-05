---
title: How to Draw Gantt Charts in Mermaid
description: Complete tutorial on Gantt charts in Mermaid, covering task dependencies, critical path marking, milestones, and weekend/holiday exclusion.
date: 2026-03-04
slug: gantt
---

# How to Draw Gantt Charts in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial

Gantt charts visualize project tasks as horizontal bars, showing start/end dates and dependencies. They are essential for project planning, sprint scheduling, and release management.

## Basic Structure

```
gantt
    title My Project Plan
    dateFormat YYYY-MM-DD
    section Phase 1
    Task name : 2026-03-01, 5d
```
<a href="https://eric.run.place/MermZen/#eJwlybEKwjAQBuBX-bm5gTSiQ-biFsjQJeBypIdW2wSaQxDx3R2yft-X3uTdQJk83bmo3goA6KqbIHwQj_qUrIgbl14Lq1zrsbMipZRMCGaaejXJutaC-OAmGDvO3F4ovAs8nHUXY0_GjgPOC_3-mhklWQ" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#eJw1y7EKwjAUheFXOWROIKaokE0J3To4BlxichXRJiVeuojvLpr2rP933mIW1kgRhRW3kJnPGQBSYOpLHQPDe-_VMCjnWnpR5HvJcDTTs0wj5eVzDPFBOQEWF5Iw2uyU7pTeSOxTI30tmX_GIlyZ6h9ul3g6oG2Nq5bokvh8AdmQMXw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#eJxdyrEKwjAUheFXOWS-gdpUwawtgkPBNeASklACbVLSSxfx3UVaFTzTD-d7iFXomoQTWgw2Md8TAHjL4ZLLZBnGGCP7XnbddrV5msfAwQPQ8DkFAlBX9UlWSlYHgvKbvCbMJQ8lLAs0rOO4BvrJhnDc5S0kH9PwTmh89pVnQrPLtkSOzo6bdCUy_UnlxfMFiPA3Yg" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#eJxlkMFOwzAQRH9llXOC0hT1kFshqlSJHkBwCOrFsodg4dipvUlBiH9HidMWVF8i73rePOU7GZKySBOZlEkjLPPeEhGxZgPawbevsHRnXEMbCO49aFjc5PGREoyN861gquu6zna7rKriCp_S9AqBjsAHrAp7GxcBkrWzVCHoZp494dBrjxaWw3gvSTmLlIg8DuOHirxYZfkyyxcpFSqmXrbUeceOvzptm7-pXk8hEm8MPzOW6tpggHHd2BoXz2g7IxikMEQNIVkPSIk7k16AEX87a6w9a2lAR6959CjpdITnq9RqTt1vKYD77vT2kpL_5GNzcSX_IHor3-PscU2MMJXPLOn1VD2O0zMrkpezQSSca6mkVhsEnv_hxWBi5Cr5-QV7CaFF" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
