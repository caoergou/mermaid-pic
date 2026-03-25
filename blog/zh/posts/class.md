---
title: 如何用 Mermaid 画类图
description: 用 Mermaid 类图描述面向对象模型，掌握类、属性、方法、继承、组合等关系语法，含完整示例。
date: 2026-03-04
slug: class
---

## 什么是类图？

类图（Class Diagram）是 UML 中最常用的图表之一，用于描述系统中类的结构（属性和方法）以及类之间的关系（继承、关联、组合等）。适合系统设计、数据建模、团队协作讨论等场景。
<iframe src="https://eric.run.place/MermZen/embed.html#eNqrVipTsjLSUUpWslJKzkksLnbJTEwvSsyNyVMAArCIQmhxapFCNUQEBLQz80oUMlOQBIJLijLz0hXyEnNTEaK6UNECoBnl-UXI6nPy0zPzNDQVkvLzc1CF80tLgOJl-TDja5VqASPRLvQ" width="100%" height="600" frameborder="0"></iframe>


## 为什么用类图？

- **UML 中最常用的静态结构图**：类图是面向对象建模的核心工具
- **描述系统结构**：清晰展示类、属性、方法和关系
- **适用场景广泛**：
  - 面向对象设计与分析
  - 数据库建模（ER 图的补充）
  - API 接口设计
  - 代码架构文档

## UML 设计场景

| 场景 | 用途 |
|------|------|
| 系统设计阶段 | 规划类结构、定义属性和方法、梳理类之间的关系 |
| 代码评审 | 讨论类之间的耦合度、继承层次是否合理 |
| 文档编写 | 生成类图文档，便于团队成员理解系统架构 |
| 数据库设计 | 映射类到数据库表，规划实体关系 |

## 基本语法

### 声明类与成员

```
classDiagram
    class User {
        +int id
        +String name
        -String password
        +login() bool
        +logout() void
    }
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzkksLnbJTEwvSsyNyVNQUFAAiyiEFqcWKVRDREBAOzOvRCEzBUkguKQoMy9dIS8xNxUhqgsVLUgsLi7PL0JWn5OfnpmnoamQlJ-fgyqcX1qioalQlg8zvlapFgAj0S70" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

**访问修饰符：**

| 符号 | 含义 |
|------|------|
| `+` | 公有（public） |
| `-` | 私有（private） |
| `#` | 保护（protected） |
| `~` | 包内可见（package） |

属性格式：`+类型 属性名` 或 `+属性名 类型`（两种均可）。
方法格式：`+方法名(参数) 返回类型`。

### 类之间的关系

```
classDiagram
    Animal <|-- Dog : 继承
    Animal <|-- Cat : 继承
    Dog *-- Paw : 组合
    Cat o-- Toy : 聚合
    Dog --> Food : 依赖
    User ..> Logger : 使用
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzkksLnbJTEwvSsyNyVNQUFBwzMvMTcxRsKnR1VVwyU9XsFJ4vnv5s879mLLOiSVosiD1Wrq6CgGJ5WCZlqcTOiAyILX5uroKIfmVClYKLxpnwWVAenR17RTc8vNTFKwUnuyb-2LrNIhUaHFqkYKenp2CT356emoRSHbv_udTVijVAgBiL0UJ" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

| 写法 | 关系类型 | 含义 |
|------|---------|------|
| `A <\|-- B` | 继承 | B 继承 A |
| `A <\|.. B` | 实现 | B 实现接口 A |
| `A *-- B` | 组合 | A 由 B 构成（强依赖） |
| `A o-- B` | 聚合 | A 包含 B（弱依赖） |
| `A --> B` | 关联 | A 引用 B |
| `A ..> B` | 依赖 | A 临时使用 B |

### 关系类型选择指南

| 关系 | 语法 | 适用场景 |
|------|------|---------|
| **继承** | `<\|--` | is-a 关系（子类继承父类），如「狗是动物」 |
| **组合** | `*--` | 整体-部分关系，生命周期一致（部分不能独立存在），如「人与心脏」 |
| **聚合** | `o--` | 整体-部分关系，生命周期独立（部分可以独立存在），如「班级与学生」 |
| **依赖** | `-->` | 使用关系，临时性依赖，如「方法参数」 |
| **关联** | `--` | 拥有关系，永久性关联，如「学生与课程」 |

**选择建议：**
- 如果是「是一种」关系 → 使用继承
- 如果部分随整体销毁而销毁 → 使用组合
- 如果部分可以独立存在 → 使用聚合
- 如果只是临时使用 → 使用依赖

### 多重性标注

```
classDiagram
    User "1" --> "0..*" Order : 下单
    Order "1" *-- "1..*" OrderItem : 包含
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzkksLnbJTEwvSsyNyVNQUFAILU4tUohRMoxRUtDVtVOIUTLQ09OKUVLwL0pJLVKwUniyo_tp71SIWogYRLGWri6IhaTYsyQ1V8FK4WlP69MJq5VqATk9JQQ" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 完整示例：电商订单模型

```
classDiagram
    class User {
        +int id
        +String name
        +String email
        +placeOrder() Order
    }

    class Order {
        +int id
        +Date createdAt
        +String status
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
        +int stock
    }

    User "1" --> "0..*" Order : 下单
    Order "1" *-- "1..*" OrderItem : 包含
    OrderItem "*..*" --> "1" Product : 引用
```
<a href="https://eric.run.place/MermZen/#eJydkc1KAzEQgF9lmFO7ukU97kEQeunJQvWWy5iNSzCbrcmsIKVHTyp4sO8g-AIefBwXX0M2UQhdtGAuCd_8fMxkhTdYHO2jxAKlIe-nmipHtbAAAIHAuVcOVpH0Z09bBl0mYMFO2wos1WpIVU3aJHhpSKpTVyo3GkO4Y3AtbGoNkb-1U2IF0iliVZ7w0OyZuPUJl2TkWcNkRmO4NA3x7-YZq3pgv27JsubbBIc20FrNc6dlOn6leNFe8E7d3DVlK_k_G47y5Za4L_bcyKstXfhHgYcCIc-PQeDBZJIJ_N50AR9v993jJuZGFpOzPO9fSXJYTgHdw1339JoUBC4wi6lR0nf4GbGA7n3z-fyC6y8rpLv5" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

<a href="https://eric.run.place/MermZen/" target="_blank" class="try-in-editor">在 MermZen 中试试 →</a>

## 常用语法速查

| 语法 | 含义 |
|------|------|
| `classDiagram` | 声明类图 |
| `class 类名 { }` | 定义类 |
| `+属性名 类型` | 公有属性 |
| `-属性名 类型` | 私有属性 |
| `+方法名() 返回类型` | 方法定义 |
| `A <\|-- B` | 继承关系 |
| `A *-- B` | 组合关系 |
| `A o-- B` | 聚合关系 |
| `A --> B` | 关联/依赖 |
| `"1" --> "0..*"` | 多重性标注 |

## 最佳实践

### 类设计建议

- **控制类的大小**：建议每个类不超过 10 个属性，保持类的职责单一
- **使用访问修饰符**：
  - `+` 公有：对外暴露的接口
  - `-` 私有：内部实现细节
  - `#` 保护：子类可访问
- **明确标注多重性**：使用 `1`、`0..*`、`1..*` 等标注，清晰表达数量关系
- **控制关系复杂度**：建议单个类的关系不超过 10 条，避免过度耦合

### 命名规范

| 元素 | 规范 | 示例 |
|------|------|------|
| 类名 | 大驼峰（PascalCase） | `UserAccount`、`OrderItem` |
| 属性 | 小驼峰（camelCase） | `userName`、`createdAt` |
| 方法 | 动词+小驼峰 | `placeOrder()`、`calcTotal()` |
| 关系标签 | 简洁动词短语 | `下单`、`包含`、`引用` |

### 常见错误

- ❌ 过度使用继承（应优先使用组合）
- ❌ 忽略多重性标注（导致关系不明确）
- ❌ 类名使用动词（类名应为名词）
- ❌ 属性和方法混用访问修饰符风格

## 下一步

了解类图后，继续学习 [Mermaid 饼图](pie.html)，用三行代码生成数据占比可视化。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
