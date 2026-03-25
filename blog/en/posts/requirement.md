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

## Why Use Requirement Diagrams?

Requirement diagrams play an important role in software engineering and project management:

- **Visualize requirement hierarchy and relationships**: Clearly show parent-child relationships and dependencies between requirements, helping teams understand the requirement structure
- **Track dependencies between requirements**: Identify which requirements depend on others, facilitating development planning and risk identification
- **Manage "how requirements are verified"**: Associate verification methods with requirements, ensuring each requirement has corresponding tests or reviews

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

## Requirements Management Practices

Requirement diagrams support three main types of requirements:

### Functional Requirements

Functions that the system must implement, describing "what the system does":

```
requirementDiagram
    title Functional Requirement Example
    requirement "User Authentication" {
        id: FR-001
        text: System supports username/password login
        type: functional
        status: approved
    }
```

### Non-Functional Requirements

Requirements for performance, security, usability, etc., describing "how well the system performs":

```
requirementDiagram
    title Non-Functional Requirement Example
    requirement "Performance Requirement" {
        id: NFR-001
        text: System response time under 2 seconds
        type: non-functional
        status: approved
    }
```

### Constraint Requirements

External conditions such as technical limitations, budget, and time:

```
requirementDiagram
    title Constraint Requirement Example
    requirement "Tech Stack Constraint" {
        id: CON-001
        text: Must use React framework for frontend
    }
```

<iframe src="https://eric.run.place/MermZen/embed.html#eJyFkbFOw0AMhvc-xa_OzYDYMrAUsQFVCQ9gXdz01MQXbIeCEO_OJQOtEiQ8nHT2f_4_-5Tfhqjcsfh9pEapWyGHR28Z1VGZsb9IUH32bJNCr7LrZ61ZsdMU2CxKs8bXJBoj1iUebn6vzh9e4tVYDYEEQZmcN3iPfN6ApB6zgVuksadd3mXnEodBgsck1E6F7yXKnq1PYhk-djzneFqA7KhhtInqPHLHGGQc5BbGIUk9d5ckxf8EFYcjXpzCCdtM4kpRfE6ynYM8DuYYbFw3Bcch_wSfk56uXKbjj10Xxd1i7hKx63MjW_0AW6KRZA" width="100%" height="300" frameborder="0"></iframe>

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

## Requirement Verification Methods

Every requirement should be verifiable. Mermaid requirement diagrams use `element` nodes and `verifies` relationships to annotate verification methods:

```
requirementDiagram
    title Requirement Verification Example
    requirement "User Login" {
        id: R1
        text: Users can log in with username and password
        type: functional
        status: approved
    }
    element "Login Test Case" {
        type: test
    }
    element "Security Review" {
        type: review
    }
    
    "Login Test Case" - verifies -> "User Login"
    "Security Review" - verifies -> "User Login"
```

<iframe src="https://eric.run.place/MermZen/embed.html#eJx9kL1uwzAMhPc-xSF7hqweurTdMqU_O2EzDgFZUinKTlD03WvLReLARTkQEI-feDjlzyzKHXt7FmqVugeMZWKOcbiJ-GCVo9RkEjxeztRFx2VVF0ub98SKfWjFb_BV5KmkqXDYXZ_GZ6swrSbU5OFCC_EYxE7I49RTxyDfIFJKQ9DmRl4iVzhmX082yF2FZGQ5VaAYNfQ8E9-ls_v1VmzhjZPhiRIvDc7_2ij9Bb5ynVXsMubRCw9rUMt8gZa2PrhFX1LkhO3jXVgzsDr0D_ADsbaFbA" width="100%" height="350" frameborder="0"></iframe>

Common verification methods include:

| Verification Type | Description | Applicable Scenarios |
|------------------|-------------|---------------------|
| **Test** | Automated testing, unit testing, integration testing | Functional requirements |
| **Review** | Code review, design review, requirement review | Non-functional requirements, architecture requirements |
| **Demonstration** | Demonstrate functionality to stakeholders | User interface requirements |
| **Analysis** | Performance analysis, security analysis | Performance requirements, security requirements |

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

## Best Practices

### 1. Unique ID for Each Requirement

Use meaningful ID naming conventions for easy tracking and referencing:

```
requirementDiagram
    requirement "User Management Module" {
        id: R1
        text: Complete user management functionality
    }
    requirement "User Registration" {
        id: R1.1    ← Sub-requirement uses parent ID prefix
        text: New users can register accounts
    }
```

### 2. Clearly Define Requirement Status

Explicitly annotate the current status of each requirement:

- `approved` — Approved, ready for development
- `pending` — Pending approval, needs further discussion
- `rejected` — Rejected, no longer considered

### 3. Establish "Contains" Relationships Between Requirements

Use `contains` relationship to organize requirement hierarchy:

```
requirementDiagram
    title Requirement Hierarchy
    requirement "User Management Module" {
        id: R1
        text: Complete user management functionality
        type: functional
    }
    requirement "User Registration" {
        id: R1.1
        text: New users can register accounts
        type: functional
    }
    requirement "User Login" {
        id: R1.2
        text: Registered users can log in
        type: functional
    }
    requirement "Password Reset" {
        id: R1.3
        text: Users can reset passwords
        type: functional
    }
    
    "User Management Module" - contains -> "User Registration"
    "User Management Module" - contains -> "User Login"
    "User Management Module" - contains -> "Password Reset"
```

<iframe src="https://eric.run.place/MermZen/embed.html#eJydUc1OwzAMvu8prN2HBNx64AIHDgyhSnsAKzXBUuqUxNGoEO9Omk20Kp1E8SFS8vn7cRzoPXGglkQfGG3AdgO5lNUR1CMIj0wBg3nrCx4myPYQKcAeBe3pYe-b5GgLn6V1KG4qqK9_rkofWsG9bztHSpAGfjvyX5MYZS_oWPuR1HdUTbACfF1IU5PlqAGH1t9BruZRnulYUkQwKFluIGcVNMYn0fi_DE_e8pL5zcy8PttRM8ngvAWW1cYvGOPRhyaLRtIF89uZ-WEydWZAdxb408zluLj-HRgviiwRdndLe1lPP33pKt7sRzbfmrXmDw" width="100%" height="400" frameborder="0"></iframe>

### 4. Set Verification Standards for Non-Functional Requirements

Non-functional requirements (performance, security, etc.) must have clear verification standards:

```
requirementDiagram
    requirement "Response Time" {
        id: NFR-001
        text: Page load time under 3 seconds
        type: non-functional
        verification: "Performance testing"
    }
```

## Comparison with Other Diagrams

### Requirement Diagram vs Use Case Diagram

| Feature | Requirement Diagram | Use Case Diagram |
|---------|---------------------|------------------|
| **Focus** | Requirement hierarchy and verification | User-system interaction |
| **Main Elements** | Requirement nodes, verification elements | Actors, use cases, relationships |
| **Applicable Scenarios** | Requirements management, project planning | Requirements analysis, system design |
| **Relationship Types** | requires, contains, verifies | include, extend, generalize |

**Requirement diagrams** emphasize hierarchical relationships between requirements and verification methods, suitable for project managers and requirements engineers.

**Use case diagrams** emphasize how users interact with the system, suitable for requirements analysis and system design phases.

### Requirement Diagram vs Class Diagram

| Feature | Requirement Diagram | Class Diagram |
|---------|---------------------|---------------|
| **Focus** | Requirement hierarchy | System structure design |
| **Main Elements** | Requirements, elements | Classes, interfaces, relationships |
| **Applicable Phase** | Requirements phase | Design phase |
| **Purpose** | Understand and manage requirements | Guide code implementation |

**Requirement diagrams** are abstractions of requirement hierarchy, describing "what the system should do".

**Class diagrams** are abstractions of system structure, describing "how the system is implemented".

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
