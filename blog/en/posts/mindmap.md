---
title: How to Draw Mindmaps in Mermaid
description: Comprehensive guide to Mermaid mindmap syntax including node hierarchy, branch structures, and theme settings with complete project management example.
date: 2026-03-05
slug: mindmap
---

# How to Draw Mindmaps in Mermaid

<span class="post-meta">2026-03-05 · MermZen Tutorial

Mindmaps organize thoughts, visualize information architecture, and help understand relationships between complex concepts. They are ideal for brainstorming, project planning, and knowledge management. Mermaid uses `mindmap` keyword for mindmaps.

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslLKzcxLyU0siMlTUFBQKMrPL9HQcE7NKylKzFEIyUjNTdXUVKoFAF-xDuI" width="100%" height="600" frameborder="0"></iframe>

## Declaring a Chart

Use `mindmap` keyword:

```
mindmap
    root((Central Theme))
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslLKzcxLyU0siMlTUFBQKMrPL9HQcE7NKylKzFEIyUjNTdXUVKoFAF-xDuI" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Basic Structure

Create mindmap with main nodes and subnodes:

```
mindmap
    root((Project Management))
        Planning
            Requirements Analysis
            Task Decomposition
            Time Scheduling
        Execution
            Team Collaboration
            Progress Tracking
            Problem Solving
        Control
            Quality Control
            Risk Assessment
            Change Management
        Closing
            Project Acceptance
            Lessons Learned
            Documentation
```
<a href="https://eric.run.place/MermZen/#eJxtkLFuwzAMRH-F0JQAnTpmM5xuKeAmGbswMuGopkhHlIMGRf-9sDs0anwj34F3uC93dZvnJ-fdxsUgbcThXQAAkmperZqkH-QzvKJgR5Ekr9e_fFLDKBKk-7tM2tNlDGk2G1SCfLNgpeWI1sOWvMZBLeSg8o-HSHDwZ2pHLv6_fJIfF_yEEWplxpMmfORN0i6RGRwT-v6hcZP0xBThoHwtYK2Sk3LpfhuRQ74tw32wHiozMpsGKGF9Runobsy7JFZb6jWvX3lPQ0bxVPIdmakY7AiTUFvCrfpxypjncN8_A8OM8w" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Hierarchy Structure

Supports multi-level nodes and nested structures:

```
mindmap
    root((Software Development))
        Frontend Development
            HTML
                Semantic Tags
                Structure Optimization
            CSS
                Responsive Design
                Flex/Grid
            JavaScript
                ES6+
                DOM Manipulation
        Backend Development
            Node.js
                Express
                Koa
            Python
                Django
                Flask
            Database
                SQL
                NoSQL
        Testing
            Unit Testing
            Integration Testing
            Automation Testing
```
<a href="https://eric.run.place/MermZen/#eJx9kU9PwzAMxb9K1NMmEEgcOOwGdONvNyDbjYtpTcnW2FHilgHiu6OOA2SNeMf3e5bs58-syyYnh1mZTTJrqLLgnkgppTyzjEaaX-QNPKocO2zYWSQZj38SvWaeSZCqv_yX9rpaFnex00ujBRJTqiXUIYHFt6W0HtXCibHmA8QwxbkLrYeDjxgcUzBdv3EwNQ0jswa3x5feVDG6gQ506Y2T4chUnx4M3XxRqALIuLbZW-8cys2_pcy5wqN14vDp1nkMCXDLEJv37_K6X8luqzVQzamzIWxiOweBZwiY6P8h8bM5R_YSgxiq49yKjKTJNQnWfldUOnDWCtuIZ1_fRb6qgw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Full Example: Project Management Mindmap

```
mindmap
    root((Project Management Mindmap))
        Project Initiation
            Define Objectives
                SMART Principles
                Success Criteria
            Stakeholders
                Identification
                Communication Plan
            Charter
                Project Scope
                Constraints
        Project Planning
            Requirements Analysis
                User Requirements
                Functional Requirements
            Task Breakdown
                WBS
                Dependencies
            Time Management
                Gantt Charts
                Critical Path
            Resource Planning
                Human Resources
                Budget
        Project Execution
            Team Management
                Role Assignment
                Collaboration Tools
            Communication Management
                Meetings
                Reports
            Quality Assurance
                Standards
                Inspections
        Project Monitoring
            Progress Control
                Variance Analysis
                Adjustments
            Risk Management
                Identification
                Assessment
                Response
            Change Management
                Requests
                Approval
        Project Closing
            Acceptance
                User Acceptance
                Final Delivery
            Evaluation
                Performance
                Lessons Learned
            Documentation
                Archives
                Knowledge
```
<a href="https://eric.run.place/MermZen/#eJyFVMFy00AM_ZWdnNoZThx7c5IWOjRDSAJcuKhrxVGzloy0m5Jh-HdmE0pJvDE6Wk-y9N7T_hztRjdv34z86GbUEtctdN_YOedUJF5dzVWe0Ec3A4YGW-ToZkfU9fURl-MFdc8UCSIJv-ZyTHFNjO7jY0bRDu00nWM5qxYrN1diT10oIpL3aOYmShGV4BSxjLDFjYQatVB7XyNHWpMvDJdjIm2b-E_azQOcYSYb0IjaL3zZfOmlw1JftqhAHK3PVv4NEzenZQv8nkgPVJurGMLeqLDRZ0M9wfYhd4l93gfCAHAFtnVjRdjW8lxg5ut42f84xQ65RvZ0LtSKWvzHLP3Sd8AxHvksjJy1JQ_BzSFuznkxSerxAm053qcW-C-w0H6c6gZjX4nbH-hT3xkrhHZwmYUEdJUZNVwGTCQEeBQ9-molEs6mOjXe0L9miJG4KWy1wE56bH5KECju83RJgX3BnMsIXIPWpXth6_BgnoJvZ8IURXsSzFUaPVyocFQJ_bZfQCnPMuDrqn5KFgtGXZBtBwn6341XZmh2QUi0TtjOSJpsgJthO-fDQitZueo6lR2EPn-TINYjr_Ieu1gW6nDrQ4A7ykc-xUA71P1p_nYHIV2gZI66Fm3LTR_QTNjcA4Iy1mcvuviUGbnEtfpN-Z3_wPIcsG5w9Os3pti75w" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Quick Reference

| Syntax | Function |
|--------|----------|
| `mindmap` | Declare mindmap |
| `root((Central Theme))` | Root node (central theme) |
| `Subnode` | First-level subnode |
| `    Sub-subnode` | Second-level subnode (indented) |
| `        Sub-sub-subnode` | Higher-level subnodes |
| `%% comment` | Line comment |

## Next Step

After mastering mindmaps, continue learning [Mermaid XY Charts](xy.html) for data visualization and trend analysis.

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
