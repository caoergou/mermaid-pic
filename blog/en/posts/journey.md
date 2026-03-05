---
title: How to Draw User Journey Diagrams in Mermaid
description: Comprehensive guide to Mermaid user journey diagram syntax including phase division, touchpoints, and emotional curves with complete e-commerce shopping flow example.
date: 2026-03-05
slug: journey
---

# How to Draw User Journey Diagrams in Mermaid

<span class="post-meta">2026-03-05 · MermZen Tutorial

User journey diagrams visualize the process of users interacting with products or services, showing user behaviors, emotions, and pain points. They are ideal for user experience design, product optimization, and service design. Mermaid uses `journey` keyword for user journey diagrams.

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslLKyi8tykutjMlTUFBQKMksyUlVCC1OLVLwgogruGQmphcl5iqEgKSUagEtyROq" width="100%" height="600" frameborder="0"></iframe>

## Declaring a Chart

Use `journey` keyword:

```
journey
    title User Journey Diagram Title
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslLKyi8tykutjMlTUFBQKMksyUlVCC1OLVLwgogruGQmphcl5iqEgKSUagEtyROq" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Basic Journey Definition

Create simple user journey:

```
journey
    title Basic User Journey
    section Discovery
      Search Engine : 5: User
      Social Media Recommendation : 3: User
    section Visit
      Homepage Browsing : 4: User
      Product List Page : 5: User
    section Purchase
      Product Detail Page : 4: User
      Add to Cart : 5: User
      Checkout : 4: User
    section Completion
      Order Confirmation : 5: User
      Payment Success : 5: User
```
<a href="https://eric.run.place/MermZen/#eJxlkM1OAzEMhF9llDMnfi650S0SQiBWVHDiEjlma9jEVeItqhDvjloRKMvNsuebsf3hts6fnjhy3r3qVDLvnjMAmNjIWIQqhMfKBTfH08pkohlLqaRbLt9tYMWh0BpXeZDM8LjwB_pnrCRhxB1HCXhg0pQ4x3Dw8jg7FreIJ6lijb_WxJswMBZF36vkAR7nfyP6onEiw61UQ7_XzrZoxv1UaB0qz8ElW5CxoTP3yxhhii4U-39dt2Z608nmWEvsNG1G3peNuC-RCzrNL1JSe8PMtQ-7xNmwmoi41l-B-_wCzGiLig" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Emotional Curves

Add user emotion ratings:

```
journey
    title Emotional Curve Journey
    section Discovery Phase
      Search Engine Search : 5: User
      Ad Click : 3: User
      Product Comparison : 4: User
    section Consideration Phase
      Product Detail Reading : 5: User
      User Review Viewing : 4: User
      Price Comparison : 3: User
    section Purchase Phase
      Add to Cart : 5: User
      Fill Address : 3: User
      Payment : 4: User
    section Post-Purchase Phase
      Order Confirmation : 5: User
      Receipt : 4: User
      Evaluation : 3: User
```
<a href="https://eric.run.place/MermZen/#eJx1kDFPwzAQhf_Kk2dYaFm8VWkYWIiCYGKx7KM96tjV2UkVIf47CiFSQ8Lm03u-9937VJ3SdzfKKq0-YiuB-rcAAJmzJ5RNzByD8Sha6QiP15ZEdhCx52RjR9KjOppEowg8kxF7RBkOHGiaNO41XhLJ5No5FJ7tCRqbuVJJdK3NKGJzNsIpBmhsrz0TQBFDYkdifqYZxLRkT9mwR03GcTgsMYY3auqYLnhluoym7V8itjTn2azxVK3YAWKOsnMOOaIwkpf5D-z94BBKaaUK0zcU8n_3VzHl2_XQJ3EkQ0HvLM3YzyK7Jkt8XmwHys74dvr0i6S-vgEi1q-5" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Full Example: E-Commerce Shopping Flow

```
journey
    title E-Commerce User Shopping Journey
    section Need Recognition
      Recognize Need : 4: User
      Define Requirements : 5: User
      Product Research : 4: User
    section Information Gathering
      Search Engine Search : 5: User
      Browse E-Commerce Platform : 4: User
      View Product Reviews : 5: User
      Price Comparison : 3: User
    section Purchase Decision
      Product Detail Page : 4: User
      User Review Analysis : 5: User
      Customer Service Consultation : 3: User
    section Purchase Process
      Add to Cart : 5: User
      Cart Checkout : 4: User
      Fill Address : 3: User
      Payment : 5: User
    section Delivery Experience
      Order Confirmation : 5: User
      Shipment Notification : 4: User
      Logistics Tracking : 5: User
      Receipt : 5: User
    section Post-Purchase Experience
      Product Usage : 4: User
      Problem Feedback : 3: User
      Review Sharing : 4: User
      Repurchase : 5: User
```
<a href="https://eric.run.place/MermZen/#eJyFkk9vm0AQxb_KiHNzSdMLtxQ7UasqRSbpqZfN8gxTwy6dWew4Vb97helGDhDltpqZfe83f_4k-yS9_JDYJE1--V4cjj8dEVHg0IDWF5lvW4gFPSiEitp3HbuKvp7XKmxg7-gOKGkD6yvHQ2DMUgw9Y6xI6So9ycX8Clt2oA1-9yxo4YJSSp9eF-Xiy94G2kBhxNZTmQjxxW29tOb0vjWhhrCrokgxfl27ajAsotDE6rP4g75qPm9MGGTn7D8YhzO2PeOwCM8WlPm2M8LqHaX0cQk-78XWRkErWNazEUaHFYLhhnJTYc5yWtHIQNfONEflBZas1-DbYZmQ_YjltG_COLL3wHLxFqpR7LosKXjKjIQFpyGa1bA734c57g03zSAgUJ36EuXmOFzCVDUCrdDwHnKk9VMHYTiL-PO7lJChqy3HQ5ihFTV3J_k7H3jLNpZNEL_5ijWwVboXY3fD5c-kNrDg7k3Q3Gu4eBnfnDZu9kEXd5qLf2zQ0g1QPhq7mw_q_8KL2sjIdzXNd9H9BTH5-w8srkDv" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## Quick Reference

| Syntax | Function |
|--------|----------|
| `journey` | Declare user journey diagram |
| `title Title` | Set chart title |
| `section Phase Name` | Divide journey phases |
| `Touchpoint : Rating: Role` | Define user touchpoints and emotions |
| `5` / `4` / `3` / `2` / `1` | Emotion ratings (5 highest, 1 lowest) |
| `%% comment` | Line comment |

## Next Step

After mastering user journey diagrams, you can continue learning other Mermaid diagram types or check our [Mermaid Cheat Sheet](../cheat-sheet.html) for complete syntax reference.

---

To try the above code in MermZen, click [Open Editor](https://eric.run.place/MermZen/) and paste the code there.
