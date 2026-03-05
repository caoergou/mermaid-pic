---
title: 如何用 Mermaid 画用户旅程图
description: 深入讲解 Mermaid 用户旅程图的阶段划分、触点定义、情感曲线等语法，附电商购物流程的完整实战示例。
date: 2026-03-05
slug: journey
---

# 如何用 Mermaid 画用户旅程图

<span class="post-meta">2026-03-05 · MermZen 教程

用户旅程图用于可视化用户与产品或服务的互动过程，展示用户的行为、情感和痛点，适合用户体验设计、产品优化、服务设计等场景。Mermaid 使用 `journey` 关键字声明用户旅程图。

<iframe src="https://eric.run.place/MermZen/embed.html#eJwBNgDJ_3sidiI6MiwiYyI6ImpvdXJuZXlcbiAgICB0aXRsZSDnlKjmiLfml4XnqIvlm77moIfpopgifSyQGNo" width="100%" height="600" frameborder="0"></iframe>

## 声明图表

使用 `journey` 关键字：

```
journey
    title 用户旅程图标题
```
<a href="https://eric.run.place/MermZen/#eJwBNgDJ_3sidiI6MiwiYyI6ImpvdXJuZXlcbiAgICB0aXRsZSDnlKjmiLfml4XnqIvlm77moIfpopgifSyQGNo" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 基本旅程定义

创建简单的用户旅程：

```
journey
    title 基本用户旅程图
    section 发现
      搜索引擎 : 5: 用户
      社交媒体推荐 : 3: 用户
    section 访问
      首页浏览 : 4: 用户
      产品列表页 : 5: 用户
    section 购买
      产品详情页 : 4: 用户
      加入购物车 : 5: 用户
      结账 : 4: 用户
    section 完成
      订单确认 : 5: 用户
      支付成功 : 5: 用户
```
<a href="https://eric.run.place/MermZen/#eJxtkM9Kw0AQh19l2LMn_1z2WbyVHCqSgkZBxINIYK02jaY1goWaEtModttDQjG19WUys5u38BBSrOl1fr_vG2Yu2TnjuzuswTg7ap2dmMbFoQkAYDWtYwNwmNHgU_ViEnPybRXf4cuqLJwaDavZMgG7D8qZlTMAcgcqGeF3nzwHOBxwKOEqV-Eqz0L8eMyXHjmx7rjAYW-zVZm1_Cl8WZFF9FQEKaVdPRbAYf-_Oc_G6F2j8HUQF0FaX77WJpP8a7aJ6WlEN3aJ1czYfkX7TScTdfuul9HWsxaeTqI6vH6SvCfhVm0tR9jpq0BqGW6zUW-aL55JuNge_s3Z1S86c82J" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 情感曲线

添加用户的情感评分：

```
journey
    title 情感曲线旅程图
    section 发现阶段
      搜索引擎搜索 : 5: 用户
      广告点击 : 3: 用户
      产品比较 : 4: 用户
    section 考虑阶段
      产品详情阅读 : 5: 用户
      用户评论查看 : 4: 用户
      价格比较 : 3: 用户
    section 购买阶段
      加入购物车 : 5: 用户
      填写地址 : 3: 用户
      支付 : 4: 用户
    section 后购买阶段
      订单确认 : 5: 用户
      收货 : 4: 用户
      评价 : 3: 用户
```
<a href="https://eric.run.place/MermZen/#eJx1kMtOwmAQhV9l0rUr0c3_LO4IC4wpiVYTY0zQUi8QK4QSS8BwiVyMoSWm0rRFeJnO_MNbuGgwgmU3kzOT75xzpVwoYn9PySpCOS6cn6q5yyMVAEDLayc5IN2gUodanzJc0oshxxVsLZKDs1xWyxdUwOeaNKcre0bOV6IAULUtvT7OG1Q3kxkEHAqQ1pge_PUVBkusleVtgPcRCMhs63E4wvoNuRYvdBBwsKmv-VzUuVnb5Cef7A5JN1a2wW6Uxk82dkvshNQZyHblPwUgjnzqzn9dZHa48CZxsNUClrtoDNibyMd3_h6mVtD7wLsmtqf4WkyrgCw3juzd4bFqppHZ6eNTQ_Ycdt7SsGTN2BulpWW3FEf-XyvK9Q_0iwvS" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 完整示例：电商购物流程

```
journey
    title 电商用户购物旅程
    section 需求识别
      意识到需要 : 4: 用户
      明确需求 : 5: 用户
      研究产品 : 4: 用户
    section 信息收集
      搜索引擎搜索 : 5: 用户
      浏览电商平台 : 4: 用户
      查看产品评价 : 5: 用户
      比较价格 : 3: 用户
    section 购买决策
      产品详情页 : 4: 用户
      用户评价分析 : 5: 用户
      客服咨询 : 3: 用户
    section 购买过程
      加入购物车 : 5: 用户
      购物车结算 : 4: 用户
      填写地址 : 3: 用户
      支付 : 5: 用户
    section 交付体验
      订单确认 : 5: 用户
      发货通知 : 4: 用户
      物流跟踪 : 5: 用户
      收货 : 5: 用户
    section 售后体验
      产品使用 : 4: 用户
      问题反馈 : 3: 用户
      评价分享 : 4: 用户
      再次购买 : 5: 用户
```
<a href="https://eric.run.place/MermZen/#eJyFkdtOIkEQhl-lMtdeebiZZ_HOcKExmChusjEmoDKOBxh2aRZcR2EmchKZwTiAMiIv09WHt9jElomHNnvX6ar6_6_q3zN-GObigrFmmMbG1u52OvVzNQ0AkFnPbKaAkyFWLE46zB6LqM9Puqya550z1bOTWsusb6VBull2fyBCC-2eqgCwI-f1YyDdrGjlwIRlE5RQ0lIrci9Qw2DCyuc6bxDeHdFJG8ua-bk5nXksFzIykpdWolxyeeTjc4WVi-qt02dDR7RttSI-PaAz0FLWm9w9UxQiPKLxWKsVEvFySOMxazyDCUt6VhH16dMArQfe_zOfnCu32GFeekMdwtv9X83Rtth1SYeAgc_cAv7uiND_H4KYHScpAuBpA_NNla-YtnTiSZHHZR5UdZTo9dC6QHeAV9mv_gCMhDSufRVPgpzc0LhGp2V5e57YBj4WKtwLRHCj3dn5JaK2zP7l9ab2ciddNsyJcV083mpjIyMRtb9nQhJgqfiRSQVGpzNOOjpPWQ2kX0OnIFu27g5JjnTS097RKrA7T-X0nszY_wf9SM5f" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 速查表

| 语法 | 功能 |
|------|------|
| `journey` | 声明用户旅程图 |
| `title 标题` | 设置图表标题 |
| `section 阶段名` | 划分旅程阶段 |
| `触点 : 情感评分: 角色` | 定义用户触点和情感 |
| `5` / `4` / `3` / `2` / `1` | 情感评分（5 最高，1 最低） |
| `%% 注释` | 行注释 |

## 下一步

掌握用户旅程图后，您可以继续学习其他 Mermaid 图表类型，或查看我们的 [Mermaid 图表速查表](../cheat-sheet.html) 获取完整的语法参考。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
