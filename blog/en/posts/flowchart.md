---
title: How to Draw Flowcharts in Mermaid
description: Complete guide to Mermaid flowchart syntax including node shapes, connector types, subgraphs, and conditional logic with practical examples.
date: 2026-03-04
slug: flowchart
---

# How to Draw Flowcharts in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial

Flowcharts visualize process steps and decision paths, making them ideal for user flows, approval processes, or algorithm descriptions. Mermaid uses either `graph` or `flowchart` keywords for flow diagrams.
<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKL0osyFAIcVGqBQBEswY6" width="100%" height="600" frameborder="0"></iframe>


## Declaring a Chart

```
graph TD
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKL0osyFAIcVGqBQBEswY6" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#eJwtjbEOwiAURX_l5U2QmJg4dtOi7q0bMrzCSyWh0CC4NP13Bzqec25yN_xhdzmhxQ7nTOsHXuodAQCuemBbKM6BTTM3MaQaHTvIbItsst-UpyVFtzdWQvQ-28DyGNyFHgs5Xxc4w-pDMEd4aD3WKadafGRzfDy1UFRooi9Lg_sf8Hkwvw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKL0osyFDwCYrJU1BQUHBU0NW1U3BCcHQVnOEcPV07BRcYz9bWTsEVoS4nMSk1B6TXDcmgGrBojYK7Ui0AIbcbvA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKL0osyFAIcYnJU1BQUCguTYIIuBXl55Wk5qVAhEHAMTrUU8EnsTK1KFZBV9dOwSk6LDEnMyWxJDM_LxaiDK4eboxTYnI2iinO0Y4BnhADXKJdEksSkxKLU9G1O4HlnZVqAbsAMTo" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#eJxNjk1OwzAQRq8y8qqVqITorgtQ0_yQghAiZYFMFsYeiNXURmPTIiU9AAfhYpwE1Ukg63nfe9OwPVtcnDHJFuyNxHsFm_jZAAAsJ7zwgnw5hdnsEiL-6JAAjUdyIAkVGq9F7coOjwK1apZS2g_jAT-18-7q2F1Xp2t7Z1uIeVHZAyCRpX4ad4Ex-YSuhaS5F84dLCnYi1qrQZb8yVKeG0m4Q-PhVegaQrvXpkGbNanQtYOfr2-YD4bsP3LNb63cgujfnp_DTptyjJ1C0bgcdjnP0CAJj1Cgc9oa2NgtDtM8xNf8AZUmlB68BSVc9WIFqZ5ZB-ZmwhOjyik7_gJxL3n6" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
