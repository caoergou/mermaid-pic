---
title: How to Draw Sequence Diagrams in Mermaid
description: A practical guide to Mermaid sequence diagrams covering participants, message types, loops, conditional logic, and parallel execution with API integration examples.
date: 2026-03-04
slug: sequence
---

# How to Draw Sequence Diagrams in Mermaid

<span class="post-meta">2026-03-04 · MermZen Tutorial

Sequence diagrams show interactions between participants over time. They answer the question: **Who sends what to whom at which moment?** Perfect for API flows, user-system interaction, and microservice communication.
<iframe src="https://eric.run.place/MermZen/embed.html#K04tLE3NS051yUxML0rM5VIAgpz8_AKFZ-v7X86aomBsoPB8-SSwMAg8XbfoWcf256vX69rZPZvT-7Rr4dOZK6wUnu5vfrF987PFDc-2dsPVwuV1gYrhGq0UCvLz0sGKUvNSAA" width="100%" height="500" frameborder="0"></iframe>


## Declaring Participants

```
sequenceDiagram
    participant User
    participant Server
    participant Database
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqTi0sTc1LTnXJTEwvSsyNyVNQUFAoSCwqyUzOLEjMK1EILU4twhQNTi0qwybukliSmJRYnKpUCwC2TiLE" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#eJxtjL0KwjAQgF_lyNSAWRwzBFr6Bq4uRzxtoObqnWkV8d1FawuC8_fzMKPx242JxhulS6EcqU14EjzvMwBA7UJoPOy4TwfggTKgCE9Q6T3HTjhzUTurjXMh1B5a1I5-ZSEdOCvZZWrXJ75Hs7fAD_1e_uDb2k7p2kEUVoXqiKkvQtY8X-APQ6g" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#eJyFTrsKAjEQ_JUltQfxtEqR5hQUCwuxu2a9LGcgbs4kF1Dx30Xio9OphnkxN5GFqieiE0pEOo_EHS0s9gFPLQMAOO8HWGYKF5jJWLQnGmeJU6X1jkKmoGBFGNKBMMFguf8Gi19VWpeKgsG_fWLTcqHoEjSBDHGy6CJkdNb8WqmlhO3mteMiwZr_duZyCnvGMR19sFcynxfi_gCNZlG6" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

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
<a href="https://eric.run.place/MermZen/#eJx9kVFP20AQhP_KyE9QxSKNoJVOqquWGkhLSBob5SVSddjbcMK5C3uXRCjyf0c-Ow4Fl8e73dlvZ2cXbAIx6AVZIAJLj2vSGf1QcsFyOdcAIDNnGLeWuH6vJDuVqZXUDt_ZbDsL3ybDhHjTVZpSruzb79FT8vt6rutCRQujqBkvkKzvlsqhMAvVdDSlMIpalMBknKQ4kSt14juxW1tiLZfUw0pauzWcl3tEKwujyK8kcBmnNeLPX6kK0arLWuG7wn-JF1IVyMxaOxz1j7tme18CSXwdn6f4gIvpeIRqssXsKp7G2FO-fK3FXvAKU90DTJnhfM-QhcOkMYWNLFRe_7_mv5hySZpYOsLPWYrUPJDG0VUyOPt03C1tzpLEKSxZq4wWO1fJSnzupL2MbNDvY_wLtaDnXZYHzSG-Q8bOMEFpFCaTRfWSC3qrCKPo1vdX2zFlDs4gl_b-zkhutqLCEmZs9KLN_V2Hw5vz6XvJ_9_laf8jdsRsWGAeDLUP4gANOiy3BpJ7s4XXYknWtm5J50H5DAJ8KvE" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
