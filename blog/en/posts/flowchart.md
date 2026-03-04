---
title: How to Draw Flowcharts in Mermaid
description: Complete guide to Mermaid flowchart syntax including node shapes, connector types, subgraphs, and conditional logic with practical examples.
date: 2026-03-04
slug: flowchart
---

# How to Draw Flowcharts in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial</span>

Flowcharts visualize process steps and decision paths, making them ideal for user flows, approval processes, or algorithm descriptions. Mermaid uses either `graph` or `flowchart` keywords for flow diagrams.

## Declaring a Chart

```
graph TD
```

Direction parameters:

| Parameter | Meaning |
|-----------|---------|
| `TD` / `TB` | Top to bottom |
| `LR` | Left to right |
| `BT` | Bottom to top |
| `RL` | Right to left |

## Node Shapes

```
graph TD
    A[Rectangle]
    B(Rounded rect)
    C{Diamond}
    D((Circle))
    E([Stadium / pill])
    F[[Subroutine]]
    G[(Database)]
```

| Syntax | Shape | Usage |
|--------|-------|-------|
| `A[text]` | Rectangle | Step / action |
| `A(text)` | Rounded rectangle | Subprocess |
| `A{text}` | Diamond | Decision / condition |
| `A((text))` | Circle | Connector / junction |
| `A([text])` | Stadium | Start / end |

## Connector Types

```
graph LR
    A --> B
    A --- C
    A -.-> D
    A ==> E
    A --label--> F
    A -->|label| G
```

| Syntax | Meaning |
|--------|---------|
| `A --> B` | Solid arrow |
| `A --- B` | Solid line, no arrow |
| `A -.-> B` | Dashed arrow |
| `A ==> B` | Bold arrow (emphasis) |
| `A --text--> B` | Labeled arrow |

## Subgraphs

```
graph TD
    subgraph Frontend
        A[UI Layer] --> B[Validation]
    end
    subgraph Backend
        C[API] --> D[Database]
    end
    B --> C
```

## Full Example: User Login Flow

```
graph TD
    A([Start]) --> B[User enters credentials]
    B --> C{Account exists?}
    C -->|No| D[Show error]
    D --> B
    C -->|Yes| E{Password valid?}
    E -->|No| F[Increment fail count]
    F --> G{Fails ≥ 3?}
    G -->|Yes| H[Lock account 30 min]
    G -->|No| B
    E -->|Yes| I[Generate Session Token]
    I --> J[Redirect to dashboard]
    J --> K([End])
```
