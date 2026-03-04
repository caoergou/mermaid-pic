---
title: How to Draw Class Diagrams in Mermaid
description: Learn how to create class diagrams in Mermaid, including inheritance, associations, composition, and multiplicity notation.
date: 2026-03-04
slug: class
---

# How to Draw Class Diagrams in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial</span>

Class diagrams describe object-oriented systems by showing classes, their attributes, methods, and relationships between classes.

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

## Multiplicity

```
classDiagram
    User "1" --> "0..*" Order : Places
    Order "1" *-- "1..*" OrderItem : Contains
```

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
