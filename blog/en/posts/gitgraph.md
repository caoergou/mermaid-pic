---
title: How to Draw Git Graphs in Mermaid
description: Comprehensive guide to Mermaid Git graph syntax including branch creation, commits, merging, and tagging with complete product development workflow example.
date: 2026-03-05
slug: gitgraph
---

# How to Draw Git Graphs in Mermaid

<span class="post-meta">2026-03-05 · MermZen Tutorial

Git graphs visualize version control system branch management, commit history, and merge operations. They are ideal for software development team collaboration, project management, and version control teaching. Mermaid uses `gitGraph` keyword for Git graphs.

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJU1BQUCjJLMlJVXDPLFEACyqEgPhKtQBvOw-K" width="100%" height="600" frameborder="0"></iframe>

## Declaring a Chart

Use `gitGraph` keyword:

```
gitGraph
    title Git Graph Title
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJU1BQUCjJLMlJVXDPLFEACyqEgPhKtQBvOw-K" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Basic Commits and Branches

Create simple commits and branches:

```
gitGraph
    title Basic Git Graph
    commit "Initial commit"
    commit "Feature A"
    branch feature-branch1
    commit "Complete feature 1"
    commit "Fix bug 1"
    checkout main
    branch feature-branch2
    commit "Complete feature 2"
```
<a href="https://eric.run.place/MermZen/#eJyFjcsKwjAURH9luGtdNMvuVLD4D9mkITYX8yjxpgjiv7uohVJBlzNnHk-aqFU7stTSwNIVM3qdAEBYgsPR3NmiY8EK2RwjCzRdEgub8DE0bfDZGanF4bCQvphkPa6zv59ls2mdchyDE7fE0HwP8wN9HVbEO3vLVRANpx9f6t-X0kSvN3YUWj4" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Branch Merging

Demonstrate branch merging operations:

```
gitGraph
    title Branch Merge Example
    commit
    branch feature-1
    commit
    commit
    checkout main
    branch feature-2
    commit
    commit
    checkout main
    merge feature-1
    commit
    merge feature-2
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJU1BQUCjJLMlJVXAqSsxLzlDwTS1KT1VwrUjMLchJhcgn5-fmZpZA2EkQVWmpiSWlRam6hpgqUNgZqcnZ-aUlCrmJmXlYDTAi2YBcsAPxOABVgZFSLQB0zFEG" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Tags and Versions

Add tags and version management:

```
gitGraph
    title Version Management Example
    commit "v1.0.0 release"
    branch feature/auth
    commit "Add authentication"
    commit "Fix security vulnerability"
    checkout main
    merge feature/auth tag: "v1.1.0"
    commit "Test fixes"
    branch hotfix/security
    commit "Critical security fix"
    checkout main
    merge hotfix/security tag: "v1.1.1"
```
<a href="https://eric.run.place/MermZen/#eJyFjrFuwzAMRH-F0Fw4dkZvRdB26hZk8sIotEVUogKJMhQU_fciMJIg7tD1eI_3vs1s-u2LsaY3E-tHwrMbBABAWT3BgVLmKPCJghMFEoW3iuHsaWnZGAIrDGbumrZpIZEnzDSY5XxMKNbBSKgl0QaLuhX3ejrBNSZRtqgc5cbeK-9cIZMtifUCc_FCCY_sWS_3qiP7FYtCQJYlCpQmehoGxalfTLum_bOyp6wwcqW8kndRR66bm8EK2yW-ivuH4cj1X6_Vzye1bjDm5xeEWYhS" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Full Example: Product Development Flow

```
gitGraph
    title Product Development Git Flow
    commit "Project initialization"
    commit "Basic architecture"
    branch feature/login
    commit "Implement login functionality"
    commit "Login UI optimization"
    checkout main
    branch feature/dashboard
    commit "Dashboard framework"
    commit "Data visualization components"
    commit "User statistics"
    checkout main
    branch feature/settings
    commit "User settings page"
    commit "Security settings"
    checkout main
    merge feature/login tag: "v1.0.0-beta"
    commit "Testing fixes"
    merge feature/dashboard
    merge feature/settings tag: "v1.0.0"
    branch hotfix/performance
    commit "Optimize loading speed"
    commit "Reduce memory leaks"
    checkout main
    merge hotfix/performance tag: "v1.0.1"
```
<a href="https://eric.run.place/MermZen/#eJyNkktPwzAQhP_Kymfog2OPqKKqhEQF9JbL1tkkS_2SvUlbEP8dpaWRkiDgujOeb7z2h2rU4u5GabVQJcsqYqgyBwAgLIZgE31ea4ElNWR8sOQEVizwYPzh4tPeWhbI1Cb6N9IC7FgYDb-jsHeZGtjuMbEGjLpiIS11pKtlF9HpCgrCdjo1vmQ3OLy2wdC5xFmFona6paBhOY1Qj2fPdg0-CNthoYr03tcCFq-YQYEcU7XzGPNB7PI6hyKipYOP-xF6iYLQcKq7RbRa8I6cpJF7myhCEhROwjr9v2IiEXZl-jHvW4OAJY2QL6TryHLqbL9ALcWS-u8CguUCMtXMJ7PJ7HZHgiPEK6U2GQo-UhffzxqsuC92F-ixBr-l8lLwcRooFj5adJoGLZ4ub09gPOZtnRSI8lHZZ8prTWDJ-ngCQ7j_eyNjdq_qPFPq8wvTwSe7" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Quick Reference

| Syntax | Function |
|--------|----------|
| `gitGraph` | Declare Git graph |
| `title Title` | Set chart title |
| `commit "Message"` | Create commit node |
| `branch BranchName` | Create branch |
| `checkout BranchName` | Switch branch |
| `merge BranchName` | Merge branch |
| `merge BranchName tag: "Version"` | Merge and tag |
| `%% comment` | Line comment |

## Next Step

After mastering Git graphs, you can continue learning other Mermaid diagram types or check our [Mermaid Cheat Sheet](../cheat-sheet.html) for complete syntax reference.

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
