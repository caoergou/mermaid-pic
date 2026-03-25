---
title: How to Draw Architecture Diagrams in Mermaid
description: Comprehensive guide to Mermaid architecture diagram syntax including component definitions, interface descriptions, and deployment patterns with microservices architecture example.
date: 2026-03-05
slug: architecture
---

# How to Draw Architecture Diagrams in Mermaid

<span class="post-meta">2026-03-05 · MermZen Tutorial

Architecture diagrams visualize system architectures, component relationships, and deployment patterns. They are ideal for system design, architecture reviews, and technical documentation. Mermaid uses `architecture-beta` keyword for architecture diagrams.

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTslIw0lFQSgbSSolFyRmZJanJJaVFqbpJqSWJMXkKQFCSWZKTqhBTap6clgQkU1PSYkrNzJPMQKSFSUypqVlaqlItAFpDGNg" width="100%" height="600" frameborder="0"></iframe>

## Why Use Architecture Diagrams?

Architecture diagrams are core tools for system design and documentation:

- **Visualize system structure** — See at a glance what components make up the system and how they interact
- **Architecture review essential** — Identify potential issues during design phase, avoid rework later
- **Team communication bridge** — Help new members quickly understand the system landscape
- **Technical documentation core** — Visual representation of architecture design documents

### Use Cases

✅ **Suitable**:
- System design phase — Plan overall architecture
- Architecture review — Discuss design decisions with team
- Technical documentation — Record system structure
- New member onboarding — Quick overview of system

❌ **Not Suitable**:
- Showing code logic flow → Use flowchart
- Showing time sequence → Use sequence diagram
- Showing single module internals → Use class diagram

## Comparison with Other Diagrams

| Diagram Type | Core Purpose | Difference from Architecture |
|--------------|--------------|------------------------------|
| **Architecture** | System components & deployment | Emphasizes component hierarchy, external dependencies, deployment patterns |
| **Block** | Module structure | More generic, suitable for network topology, industrial flows |
| **Flowchart** | Process & decisions | Emphasizes step sequence, no component hierarchy concept |

**Selection Guide**:
- Show "what components exist, how they connect" → Architecture diagram
- Show "module nesting structure" → Block diagram
- Show "operation flow and decision branches" → Flowchart

## Declaring a Chart

Use `architecture-beta` keyword:

```
architecture-beta
    title System Architecture Diagram
```
<a href="https://eric.run.place/MermZen/#eJyrVipTslIw0lFQSgbSSolFyRmZJanJJaVFqbpJqSWJMXkKQFCSWZKTqhBTap6clgQkU1PSYkrNzJPMQKSFSUypqVlaqlItAFpDGNg" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Component Definition

Define system components including services, databases, external systems:

```
architecture-beta
    title Basic Architecture Components
    container "Frontend Application" {
        component "User Interface"
        component "API Calls"
    }
    container "Backend Services" {
        component "Business Logic"
        component "Data Access"
    }
    database "Database" {
        component "User Data"
        component "Business Data"
    }
    system "External Payment System"
```
<a href="https://eric.run.place/MermZen/#eJyFz8FKA0EMgOFXCTl76rG33Vah4KFQeptLTKMGZzPLJC2W0neXdVcp6uJtIF_4Mxc84XJxh4xLpMqvGsJxrNJKUDIAgNDIAi25MjQ3Alal64uJhY-QiwWpSYWED7VYiB2g6fusTKHFEsJllKOetiHh3qXCxkLqM7Ek_Fs12w2sKGf_Atff3Zb4bcjupJ6Uxeeb7dHVxB0ey4vyXHNNQdAwi_-sHijoiVwmNDz_-eDA5jrf19yiqeRnD-kg4f17SDXKsKVzN-ztPicJ8foBydOSkw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Connection Relationships

Define connections and dependencies between components:

```
architecture-beta
    title Component Relationship Diagram
    container "Frontend Application" {
        component "User Interface"
        component "API Calls"
    }
    container "Backend Services" {
        component "Business Logic"
        component "Data Access"
    }
    database "Database" {
        component "User Data"
        component "Business Data"
    }
    system "External Payment System"

    "User Interface" --> "API Calls"
    "API Calls" --> "Business Logic"
    "Business Logic" --> "Data Access"
    "Data Access" --> "User Data"
    "Data Access" --> "Business Data"
    "Business Logic" --> "External Payment System"
```
<a href="https://eric.run.place/MermZen/#eJyFkMFqAjEQhl9lmHO99OihsGoLQg-i9JbLNE41NDtZMqNUxHcv666ldbP0Fv58ky_zn_GI08cH9DhFyn4fjL0dMs_YyAkAgAWLDPNUN0lYDNYcyUIS3YcGFoF2meqO9EmMgnAGhy85ibFsoWqaGPx1wiGcO7Kjby86fFPOsBTj_EGeHZaparWEOcWoN-Ay9M7If7baDedj8KzjztlBg7AqvKZd8GPOBRlB5T3rvXVLRu-k3EPt8Z8FW2zM8_Ob31Bv0pMa1-Dw-cs4C0VY0alu5zbXmxbvyGGTMJk8lar7E_VQuZFh3uOFau7CHhwsX8aKFYzaR7vAyzdET-Rh" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Full Example: Microservices Architecture

```
architecture-beta
    title E-Commerce System Microservices Architecture
    container "User Interface Layer" {
        component "Web Interface"
        component "Mobile App"
        component "Admin Console"
    }
    container "API Gateway" {
        component "Request Routing"
        component "Authentication"
        component "Rate Limiting & Circuit Breaking"
    }
    container "Business Services Layer" {
        component "User Service"
        component "Product Service"
        component "Order Service"
        component "Payment Service"
        component "Inventory Service"
    }
    database "Data Storage" {
        component "MySQL Primary"
        component "MySQL Replica"
        component "Redis Cache"
    }
    system "External Systems" {
        component "Alipay"
        component "WeChat Pay"
        component "Logistics System"
    }

    "Web Interface" --> "API Gateway"
    "Mobile App" --> "API Gateway"
    "Admin Console" --> "API Gateway"

    "API Gateway" --> "User Service"
    "API Gateway" --> "Product Service"
    "API Gateway" --> "Order Service"
    "API Gateway" --> "Payment Service"
    "API Gateway" --> "Inventory Service"

    "User Service" --> "MySQL Primary"
    "User Service" --> "Redis Cache"
    "Product Service" --> "MySQL Primary"
    "Product Service" --> "Redis Cache"
    "Order Service" --> "MySQL Primary"
    "Inventory Service" --> "MySQL Primary"

    "Payment Service" --> "Alipay"
    "Payment Service" --> "WeChat Pay"
    "Order Service" --> "Logistics System"
```
<a href="https://eric.run.place/MermZen/#eJyNk7Fu20AMhl-FuKFTvXTMUEBWgsKAjbo2gixa6BNrE5Xu1DvKiRDk3YtEsmvLRzubho-8n9THV7M3d9--GmvuDAa7YyErbaApCRYOAEBYKoKHSe7rmoIlWHdRqIYF2-AjhT1bipCd1PZ11jtBdhSgMI-RAsycUPiNlmCOHYXCwGtP9nTdeEdOoDBPtPkPFyYNLfyGK4KsaTQiK2t2kHsXfXVs83YZLlvO4AcKPWOnZ1rR35aiwMq3wm6rvtnKjpywRWHvNGqFQjDnmt9bwRfIOdiWBaaB8M9J90TYaRvZUYywPmz-xjI_Vj_AWp5l8GVr5Rb2M5Sf6IVd_f51A5u5PTnxoRuDw8wlCm4wEhTmHgVhLT7glvQ5F9361xyWgWsMnSrNB7SipmKL6t-hkiPkaHfjULE3vzAPL0LBYTXcQtRjZRU3qOZ5onyHAkudmPstR2Ebh6dOEvUfF-cCk8n3sdUH9PRornGj00mjR_jsfno0ZV2aVNxLw0kDlb5pD9Nw0sZDwfksQ0VSN4VNCJWY-3pjDU_2Hq3peufE7FrBMcx4twdBzmTXuUvttcyX-pu3f1_DGoY" target="_blank" rel="noopener" class="try-in-editor">Try in MermZen →</a>

## Best Practices

### Component Organization Principles

- **Organize by layers**: User Interface Layer → API Gateway → Business Services Layer → Data Storage
- **Keep component granularity consistent**: Components at the same level should be at the same abstraction level
- **Distinguish internal vs external**: Use `container` for internal components, `system` for external systems

### Connection Guidelines

- **Avoid over-connection**: Single component connections should not exceed 5
- **Clear direction**: Use `-->` to clearly indicate data/call flow direction
- **Hierarchical clarity**: Define high-level connections first, then internal connections

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Container | Name by function/layer | `User Interface Layer`, `API Gateway` |
| Component | Name by specific responsibility | `Request Routing`, `Authentication` |
| Database | Name by storage type | `MySQL Primary`, `Redis Cache` |
| System | Name by external service | `Alipay`, `WeChat Pay` |

## Common Mistakes

### Mistake 1: Too Many Connections Creating Clutter

❌ **Problem**: Drawing connections between all components creates a "spaghetti" diagram

✅ **Solution**: Only draw major call relationships, document minor ones in text or split into multiple diagrams

### Mistake 2: Inconsistent Abstraction Levels

❌ **Problem**: Mixing "User Service" and "getUser API" at the same level

✅ **Solution**: Keep components at the same level at the same abstraction level

### Mistake 3: Ignoring Data Flow Direction

❌ **Problem**: Only drawing components without showing data/call flow direction

✅ **Solution**: Use `-->` to clearly mark call direction, making the architecture diagram reflect actual system interactions

## Quick Reference

| Syntax | Function |
|--------|----------|
| `architecture-beta` | Declare architecture diagram |
| `title Title` | Set chart title |
| `container "Name" { ... }` | Define container component |
| `component "Name"` | Define internal component |
| `database "Name" { ... }` | Define database component |
| `system "Name"` | Define external system |
| `"Component1" --> "Component2"` | Define connection between components |
| `%% comment` | Line comment |

## Next Step

After mastering architecture diagrams, continue learning [Mermaid Block Diagrams](block.html) for complex system architecture and process flow visualization.

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
