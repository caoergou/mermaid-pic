---
title: How to Draw Timeline Diagrams in Mermaid
description: Comprehensive guide to Mermaid timeline diagram syntax including phase division, event description, and timeline visualization with complete product development planning example.
date: 2026-03-05
slug: timeline
---

# How to Draw Timeline Diagrams in Mermaid

<span class="post-meta">2026-03-05 · MermZen Tutorial

Timeline diagrams visualize project progress, historical events, product development plans, and time-related information. They are ideal for project management, historical research, and product planning. Mermaid uses `timeline` keyword for timeline diagrams.

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslIqycxNzcnMS43JU1BQUCjJLMlJVXDOSCwqUQgBsZVqATj2Dmc" width="100%" height="600" frameborder="0"></iframe>

## Declaring a Chart

Use `timeline` keyword:

```
timeline
    title Chart Title
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqycxNzcnMS43JU1BQUCjJLMlJVXDOSCwqUQgBsZVqATj2Dmc" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Phase Division

Divide timeline into phases, each containing multiple events:

```
timeline
    title Product Development Timeline
    2024-01 : Project Initiation
      - Requirements Analysis
      - Technology Selection
    2024-02 : Architecture Design
      - System Architecture
      - Database Design
    2024-03 : Frontend Development
      - Page Layout
      - Interactive Implementation
    2024-04 : Backend Development
      - API Development
      - Database Development
```
<a href="https://eric.run.place/MermZen/#eJx1j0FLw0AQhf_KY88Wauxpb5EgBDwE22Mv63ZIRzezdXcSCMX_LjVgEtHrvO99vLmawdjiznhjjXJHgYWOAgDKGghNiqfeKyoaKMRLR6I4rLhiW-w223vYG_tGXlELKzvlKBMBbPBCHz0nuvUzSnFhzJzn-ED-LDHEdsSeAvm5POkLWJTJn1nJa58IFWVuF_79mJW6FTOHlVP36vK6NYkfYPGUoijJafnkXG5cS3h2Y-wXx1qUkvPKA6HuLuH7Mfd79Q4Wj86__-sum_rvYLH4JzWfX9nlhwM" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Detailed Event Description

Add detailed event descriptions for each phase:

```
timeline
    title Project Milestones
    Phase 1 : Requirements Analysis & Planning
      - Complete user needs research
      - Determine project scope
      - Develop detailed plan
    Phase 2 : System Design & Architecture
      - Complete system architecture
      - Database design review
      - Confirm technical architecture
    Phase 3 : Development & Implementation
      - Frontend interface development
      - Backend API development
      - Database implementation
    Phase 4 : Testing & Deployment
      - Unit and integration testing
      - System integration testing
      - Performance testing
```
<a href="https://eric.run.place/MermZen/#eJx9kLtOw0AQRX_lykUqKHhU7gIWUgoki0dHs6xvkoH1rNmdBEWIf0fGSRwki26lOXPmaL-KbVFenhW-KAuTlkGULwoAJhaIOsU3esO9BGaLyjxM67XLxAVKPPBjI4kt1TLm6sIuS8YMdXCqoquBB85xG9su0IhNZoKSTUZipkt-PVIVjakVJbr97exjx1NgyxA7NDQngQ264PS06hIlHnfZ2KJilpVihnnyazF62yROFOUBd5NU5cy99uJmsCVuhZ-nFl1KamH0axXvwoRnKLtCecjv_wszLPqA_u1Moo7OuxTVqA1EjWnpfH_9uDhyN86_99i8XkwDx3iZuDRUXaPEE7OJrjBDxS7E3V_Js4rB7WtW6dcAG1ZGav_n_zI10zKm1qnnYVh8_wBkJtT2" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Full Example: Product Development Planning

```
timeline
    title 2024 Product Development Plan
    Q1 : First Quarter
      - Complete user requirements research
      - Determine product feature scope
      - Develop detailed development plan
      - System architecture design
    Q2 : Second Quarter
      - Frontend interface development
      - Backend API development
      - Database design and implementation
      - Basic functionality testing
    Q3 : Third Quarter
      - Advanced features development
      - User experience optimization
      - System integration testing
      - Performance testing and optimization
    Q4 : Fourth Quarter
      - Product beta testing
      - Collect user feedback
      - Final feature improvements
      - Product official release
```
<a href="https://eric.run.place/MermZen/#eJxtkk9PwzAMxb-K1TNIMDj1BkxI3DYBNy5e8rpZS5PiuBN_xHdH2VYodNf4xe9n-31Wu6qenVWuqiuTFkEiXiIRkYkF0Oxidk0LTb53RnPsEFLXIhotAseDcHlJNd2LZqNlz2rQwzvROd2ltgswUJ-hpHjtRVH-Z1JksLrNr3gOg7YSQd3RsAFbr6DsUoexcM9BHsYS4MmPwLofsCJ9fM-GloqRGNy-m0eW9QA_o5oe4VL0U_p7TdEQPUk0aMMOY6df3S27bZHdLB5OC-ZsvOI8WBOXnmUzRcYmKY6bZXHU9NGVdw5i72TIJnF9RL6imp42oieIb_yOo4MfNpdP8zyXa-CtgwqiA6XOpJWPfyTH3ZXh17qv_QUpmgW0SdoW06G4n27acXldYpJ6tc2Ue0jYCsZTk7sUApwdQtQAfsVuOzqTRA4_WZG207Q7hGxqkJpGnHAgRQBnVF_f5D_-yw" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Quick Reference

| Syntax | Function |
|--------|----------|
| `timeline` | Declare timeline diagram |
| `title Title` | Set chart title |
| `Phase Name : Description` | Define timeline phase |
| `- Event` | Event within phase |
| `%% comment` | Line comment |

## Next Step

After mastering timeline diagrams, continue learning [Mermaid Mindmaps](mindmap.html) for organizing ideas and information architecture design.

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
