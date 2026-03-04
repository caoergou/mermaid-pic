---
title: How to Draw Sequence Diagrams in Mermaid
description: A practical guide to Mermaid sequence diagrams covering participants, message types, loops, conditional logic, and parallel execution with API integration examples.
date: 2026-03-04
slug: sequence
---

# How to Draw Sequence Diagrams in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial</span>

Sequence diagrams show interactions between participants over time. They answer the question: **Who sends what to whom at which moment?** Perfect for API flows, user-system interaction, and microservice communication.

## Declaring Participants

```
sequenceDiagram
    participant User
    participant Server
    participant Database
```

- `sequenceDiagram` declares the diagram type
- `participant name` controls the order of participants (left → right)
- `actor name` renders as a stick figure (for human users)
- `participant A as Alias` creates aliases for readability

## Message Types

```
sequenceDiagram
    A->>B: Solid open arrow (synchronous)
    B-->>A: Dashed open arrow (response)
    A-)B: Solid async arrow
    A--)B: Dashed async arrow
    A-xB: Solid with cross (failure)
```

## Control Structures

```
sequenceDiagram
    loop Every 30s
        Client->>Server: Heartbeat ping
        Server-->>Client: pong
    end

    alt Credentials valid
        Server-->>Client: 200 OK
    else Invalid
        Server-->>Client: 401 Unauthorized
    end
```

## Full Example: HTTP Login Flow

```
sequenceDiagram
    actor User
    participant Browser
    participant APIServer
    participant Redis
    participant MySQL

    User->>Browser: Submit login
    Browser->>APIServer: POST /api/login {username, password}

    APIServer->>Redis: GET login_fail:{username}
    Redis-->>APIServer: Fail count (0)

    APIServer->>MySQL: SELECT * FROM users WHERE username=?
    MySQL-->>APIServer: User record

    alt Password valid
        APIServer->>APIServer: Generate JWT Token (HS256)
        APIServer->>Redis: SET session:{token} 7d
        APIServer-->>Browser: 200 OK {token, user}
        Browser->>Browser: Store in localStorage
        Browser-->>User: Redirect to dashboard
    else Wrong password
        APIServer->>Redis: INCR login_fail:{username}
        APIServer-->>Browser: 401 {error: "Invalid password"}
        Browser-->>User: Show error message
    end
```
