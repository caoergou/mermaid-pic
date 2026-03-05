---
title: How to Draw Class Diagrams in Mermaid
description: Learn how to create class diagrams in Mermaid, including inheritance, associations, composition, and multiplicity notation.
date: 2026-03-04
slug: class
---

# How to Draw Class Diagrams in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial

Class diagrams describe object-oriented systems by showing classes, their attributes, methods, and relationships between classes.
<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKzkksLnbJTEwvSsyNyVNQUFAAiyiEFqcWKVRDREBAOzOvRCEzBUkguKQoMy9dIS8xNxVTNDU3MTMHSTgnPz0zT0NTISk_H004v7REQ1OhLB9mdq1SLQB1my2H" width="100%" height="600" frameborder="0"></iframe>


## Declaring Classes

```
classDiagram
    class User {
        +int id
        +String name
        +String email
        +login() bool
        +logout() void
    }
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzkksLnbJTEwvSsyNyVNQUFAAiyiEFqcWKVRDREBAOzOvRCEzBUkguKQoMy9dIS8xNxVTNDU3MTMHSTgnPz0zT0NTISk_H004v7REQ1OhLB9mdq1SLQB1my2H" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

- `+` - Public
- `-` - Private
- `#` - Protected
- `~` - Package-private

## Relationships

```
classDiagram
    Animal <|-- Dog : Inheritance
    Dog *-- Paw : Composition
    Dog o-- Toy : Aggregation
    Dog --> Food : Association
    User ..> Logger : Dependency
```
<a href="https://eric.run.place/MermZen/#eJxVyjELwjAQhuG_8pFRvA6OQQrFIggODrq5HOlxBmyuJEUp6n-X4qCu7_M-3M351dIF5124ciltZM3cnxMANCn2fMX6SYTWFB67dJEcR05BPsucF0Q48B0eG-sHK3GMlr5sRDjaBI9GNYvyPxPV2Jp1s5diIf74qUhGVdXYm6pkeLQySOokhcm93lztOmc" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Multiplicity

```
classDiagram
    User "1" --> "0..*" Order : Places
    Order "1" *-- "1..*" OrderItem : Contains
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzkksLnbJTEwvSsyNyVNQUFAILU4tUohRMoxRUtDVtVOIUTLQ09OKUVLwL0pJLVKwUgjISUxOLYaohYhBFGvp6oJYSIo9S1JzFawUnPPzShIz84qVagEOqiJX" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Example: E-commerce Order System

```
classDiagram
    class User {
        +int id
        +String name
        +placeOrder() Order
    }

    class Order {
        +int id
        +Date createdAt
        +calcTotal() float
    }

    class OrderItem {
        +int quantity
        +float unitPrice
        +getSubtotal() float
    }

    class Product {
        +int id
        +String name
        +float price
    }

    User "1" --> "0..*" Order
    Order "1" *-- "1..*" OrderItem
    OrderItem "*" --> "1" Product
```
<a href="https://eric.run.place/MermZen/#eJydUcFqAjEQ_ZVhTrrtivbooVDw0pOCestlzE6XQDZrs7OCiP8um4gdECuYS8J7L-9lXk54wPnHO1qco_XUdQtHdaTGBACAhMC24winjAzrzQUBVylgLdGFGgI1rNC9J8vLWHEcjSHtmTyboO0T87__goTBRibh6ksUYcnbTSvkR2P48S3J44Rv4eYu5benIE6OCk420Acnq-isnqdmWfc7eRq3im3VW3mlshy-_wu-WadPMDgzCGX5CQank0lhUPeai8yaoiyHk9IM8ytdqsNgcfMbbl1fjucL1XGaIA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
