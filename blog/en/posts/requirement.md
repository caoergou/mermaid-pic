---
title: How to Draw Requirement Diagrams in Mermaid
description: Comprehensive guide to Mermaid requirement diagram syntax including requirement definition, relationships, and verification methods with complete software project requirements management example.
date: 2026-03-05
slug: requirement
---

# How to Draw Requirement Diagrams in Mermaid

<span class="post-meta">2026-03-05 · MermZen Tutorial

Requirement diagrams visualize project requirements, relationships between requirements, and verification methods. They are ideal for requirements management, project planning, and software development lifecycle management. Mermaid uses `requirementDiagram` keyword for requirement diagrams.

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslIqSi0szSxKzU3NK3HJTEwvSsyNyVNQUFAoySzJSVUIQsgqQKUVQkAySrUAJHIX6g" width="100%" height="600" frameborder="0"></iframe>

## Declaring a Chart

Use `requirementDiagram` keyword:

```
requirementDiagram
    title Requirement Diagram Title
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqSi0szSxKzU3NK3HJTEwvSsyNyVNQUFAoySzJSVUIQsgqQKUVQkAySrUAJHIX6g" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Requirement Definition

Create requirement nodes:

```
requirementDiagram
    title Basic Requirement Diagram
    requirement "Requirement 1" {
        id: R1
        text: Users can log into the system
        type: functional
        status: approved
    }
    requirement "Requirement 2" {
        id: R2
        text: Users can view their personal information
        type: functional
        status: pending
    }
    requirement "Requirement 3" {
        id: R3
        text: System should have responsive design
        type: non-functional
        status: approved
    }
```
<a href="https://eric.run.place/MermZen/#eJyV0DFuwzAMheGrPGhuhjibxqAnSNHNi2AzNgGbUkVaaRDk7oWbwW6boo02gT-BD7y44nz15BrnXaa3iTONJPbMocthrAUAjG0g7INyg8PS4Eu0Wkbt1tm2drjcovlx63HYLn-jd_N4VcqKJgiG2IHFIqwn6FmNxlV8TuRxnKQxjhKGZaIWbFKPkFKOhdrb5PoXrrqDq37HFabTDOOMRFlnAliOMY9hBj0CTSQtS_dP5-6Oc_fd-fJ5LWgfp6FFHwohk6YoyoXQknL3gyhRNg_c010_ANAws0U" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Requirement Relationships

Define relationships between requirements:

```
requirementDiagram
    title Requirement Relationship Diagram
    requirement "Login Functionality" {
        id: R1
        text: Users can log into the system
    }
    requirement "Profile Management" {
        id: R2
        text: Users can view and edit their profile
    }
    requirement "Responsive Design" {
        id: R3
        text: System should display properly on all devices
    }

    "Login Functionality" --> "Profile Management" : requires
    "Login Functionality" --> "Responsive Design" : requires
    "Profile Management" --> "Responsive Design" : requires
```
<a href="https://eric.run.place/MermZen/#eJyN0D1PwzAQBuC_8sozHShbBqaKCSQUxJbFio_kJPec-i6BqOp_R2mA8pGievLH6X18t3eDK9ZXrnaFy7TrOdOWxDbsm-y3lQCAsUVCeXpFSdEbJ9GWO_yo_ZaByt2nhgV3vdRTtY9sY-Wwn0unxaFAeX06G71ZgWelrKi9IKYGLJZgLUFHNfpwDkvcY04vHAkPXnxzvFzQ1ue1gekVXgIosE0kZ3Rz5j9qSdolUR4IG1JuZAG9-Y0-HXuBtqmPAYG1i36csI5yHJEEPkYEGrgm_cLnzbm5rla354ZQfP5ZL4lY6uhvwiJ0SYA7vAOE0M8o" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Full Example: Software Project Requirements Management

```
requirementDiagram
    title E-Commerce System Requirements
    requirement "User Management" {
        id: R1
        text: Users can register, log in, and modify personal information
        type: functional
        status: approved
        priority: high
        verification: "User testing"
    }
    requirement "Product Display" {
        id: R2
        text: System can display product lists, details, and categories
        type: functional
        status: approved
        priority: high
        verification: "Automated testing"
    }
    requirement "Shopping Cart" {
        id: R3
        text: Users can add, delete, and modify shopping cart items
        type: functional
        status: pending
        priority: medium
        verification: "Manual testing"
    }
    requirement "Payment Functionality" {
        id: R4
        text: Supports multiple payment methods (Alipay, WeChat, Credit Card)
        type: functional
        status: approved
        priority: high
        verification: "Integration testing"
    }
    requirement "Performance Requirements" {
        id: R5
        text: System response time should be less than 2 seconds
        type: non-functional
        status: approved
        priority: medium
        verification: "Performance testing"
    }

    "User Management" --> "Product Display" : requires
    "User Management" --> "Shopping Cart" : requires
    "Product Display" --> "Shopping Cart" : requires
    "Shopping Cart" --> "Payment Functionality" : requires
    "User Management" --> "Performance Requirements" : impacts
    "Product Display" --> "Performance Requirements" : impacts
    "Shopping Cart" --> "Performance Requirements" : impacts
    "Payment Functionality" --> "Performance Requirements" : impacts
```
<a href="https://eric.run.place/MermZen/#eJy9lD1v20AMhv8KoakF5KFOu2goEDgtkCFAkaDo4oXV0RKB--qRMioE-e-FLLt2LKmWO0TT6US-4vOSd8_ZNiuWeVZmRZboV8OJHHm9Y6wSurUHAFBWS_BlsQrOUSoJnlpRcvB4jJc-8kQB1tl3oQQP6LHa7awzeO7DuodNAY8fju9Kv7WALkWgRA-JKhallIMNFbDPAb0BFwxvWoiUJHi0wH4TkkPl4E-k2kgFbBpfdvtoj19EURspAGNMYUvm-CUmDom1LaDmqj7ubynxhsvdH4oDk5Io-2qd9XEvY_DfUjBNqXDHEi22I_DLc_i9rR296bMg7lUsi0oOhhTZSu9FiUpVSEzyNui3jQaHSmYW_1MdYmRfwQrTWOtvpluPxnSolpRedV0OkiUmBVZyV5FH8qaregTckeHGTaM_oG_Qzus7trvV17-VsI51_-Og-02MIamAa6xytARxL-VI62AE3t1ajtjm8INWNWoOq0SGtXPYvH-bGbj3SlXavc5zg9LugPqSXl8XQ0M-TRyHRBKDFwJlR90MNNbATwJLIqA1eliCUBm8GUyDD37xvz5cGolTsqET_WLsClwsPo_eDsXBObmUe36yhplD9bmZ5xH7aidmen7N_5iDAthFLPVi9ddoTHBcU8UE83yl7OUPM0dmFQ" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Quick Reference

| Syntax | Function |
|--------|----------|
| `requirementDiagram` | Declare requirement diagram |
| `title Title` | Set chart title |
| `requirement "Name" { ... }` | Define requirement |
| `id: identifier` | Set unique requirement identifier |
| `text: description` | Set requirement description |
| `type: type` | Set requirement type (functional/non-functional) |
| `status: status` | Set requirement status (approved/pending/rejected) |
| `priority: priority` | Set requirement priority (high/medium/low) |
| `verification: method` | Set verification method |
| `"Requirement1" --> "Requirement2" : relationship` | Define relationship between requirements |
| `%% comment` | Line comment |

## Next Step

After mastering requirement diagrams, you can continue learning other Mermaid diagram types or check our [Mermaid Cheat Sheet](../cheat-sheet.html) for complete syntax reference.

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
