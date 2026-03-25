---
title: 如何用 Mermaid 画时间线图
description: 深入讲解 Mermaid 时间线图的阶段划分、事件描述、时间轴展示等语法，附产品开发规划的完整实战示例。
date: 2026-03-05
slug: timeline
---

# 如何用 Mermaid 画时间线图

<span class="post-meta">2026-03-05 · MermZen 教程

时间线图用于可视化项目进度、历史事件、产品开发规划等时间相关的信息，适合项目管理、历史研究、产品规划等场景。Mermaid 使用 `timeline` 关键字声明时间线图。

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslIqycxNzcnMS43JU1BQUCjJLMlJVXg6e9-LhSueLWh_uWiGUi0AbdkS8g" width="100%" height="600" frameborder="0"></iframe>

## 声明图表

使用 `timeline` 关键字：

```
timeline
    title 图表标题
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslIqycxNzcnMS43JU1BQUCjJLMlJVXg6e9-LhSueLWh_uWiGUi0AbdkS8g" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 阶段划分

将时间线划分为多个阶段，每个阶段包含多个事件：

```
timeline
    title 产品开发时间线
    2024-01 : 项目启动
      - 需求分析
      - 技术选型
    2024-02 : 架构设计
      - 系统架构
      - 数据库设计
    2024-03 : 前端开发
      - 页面布局
      - 交互实现
    2024-04 : 后端开发
      - API 开发
      - 数据库开发
```
<a href="https://eric.run.place/MermZen/#eJxtjs1qAjEUhV_lknUFHV1l59KdD9BdmcWAdTV0I4X4Q-lY1GmluKhNGREUhIxiK20s9mXmJuYtpAQ6obg93zkfp0VuCPUuyBWhJAyu_UbQ9C-bAABhEDZ8yOQCx238Zjh6VJOdmbxr-WMLXtGrFIoloGCSL_0iME6xv7QMoABmytSmg_d3isd5qvpMTVPDIuQPrscDCorvFO8dxeEoknyht3u9f7PM8Tyv1UCgHLt1qyoDBYwGepXa386l5MO8zvCzixuWp5mcZ_IJBdfDteup_Hri4RlPtV6D_9nfIQvI7QnovJw7" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 详细事件描述

为每个阶段添加详细的事件描述：

```
timeline
    title 项目里程碑
    第一阶段 : 需求分析与规划
      - 完成用户需求调研
      - 确定项目范围
      - 制定开发计划
    第二阶段 : 系统设计与架构
      - 完成系统架构设计
      - 数据库设计评审
      - 技术架构确定
    第三阶段 : 开发与实现
      - 前端界面开发
      - 后端 API 开发
      - 数据库实现
    第四阶段 : 测试与部署
      - 单元测试与集成测试
      - 系统功能测试
      - 生产环境部署
```
<a href="https://eric.run.place/MermZen/#eJxlkM9OwkAQh19l07NePHLz6M0H8GY4kCAn4sWYNBaxQFmL0sRQLJYLJDRb_EOpID5NZ2f7FkYmKascJ99vfvNlroxLo3R0YJwbJaNeuShXK7XyWY0xxuqVerXM8vATfZHfOTjt4LhHCKMoS838KZFiwUosH5ry9QbspgzcLOVq0gD7gZKMHTIQjrRd7E-lvaSomlv40t8lMBQgBnRKORb4H9q2nYAYwJcJ9z0lwqL512HlFA74vsb1SIlvJcIs5TJIZNDYc9iGiFF0l5DeXHYFrB4JqLgBf3DblMOYVklXe0Wr0CDPLOUgAuRzTaDVxVmMnpM_jymkMZfjLGbHpyfsPyqs9D6MIvD94qZcdFTsZSnPrSlu3rTerge31g77TWm7NGq_3_4E2iNlbfZYf5StJshjGFtUblz_APScLvI" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 完整示例：产品开发规划

```
timeline
    title 2024 产品开发规划
    Q1 : 第一季度
      - 完成用户需求调研
      - 确定产品功能范围
      - 制定详细开发计划
      - 系统架构设计
    Q2 : 第二季度
      - 前端界面开发
      - 后端 API 开发
      - 数据库设计与实现
      - 基础功能测试
    Q3 : 第三季度
      - 高级功能开发
      - 用户体验优化
      - 系统集成测试
      - 性能测试与优化
    Q4 : 第四季度
      - 产品 Beta 测试
      - 收集用户反馈
      - 最终功能完善
      - 产品正式发布
```
<a href="https://eric.run.place/MermZen/#eJxlkc1OwkAUhV9l0rUmWlmx05072bsxpgsSZNW4MSbVElK0tCA_IRTBSkKNwBSjYtOCT9M7P29hwlRs6nbOPed8986VdCnl5R3pXMpLavFCKRXLymkZIYTUolpSkLwn51AcetC6gZUGdpN5FTAexEhhH-URnc3iQIP5GMKJeEZoFwE2idGg7RdifPGBRt5u2UKnT-2_CepiwP0k-m7E9DUzdXA-UhnGEnCf-RMaVZNy7G7LNxnvEY1GZLgkwwrD3wy7CZicgIXmP7BanU592jH547MITWkNi059dHhyjLIS6SxIHUPYEjVxYAEeUmuRMo9C6mpiE_J5z_xOwnLwe6RaloVPezT0hCVbKE4Xr1v81YxXPTC72bW5UyVGI121AdW8LUAcWGlrISdIwHGyJOIb0JGinqF_ie0ld6qCB-w6nxgpbaDRyEg2wCZ0K9lMMh_Dyga7CYEuXf8APtE8DQ" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 为什么要用时间线图？

时间线图是一种线性叙事工具，用于展示事件的时间顺序和发展脉络。

### 解决什么问题？

- **时间顺序可视化**：清晰展示事件发生的先后顺序，一目了然
- **里程碑追踪**：标记关键节点，便于回顾和总结
- **叙事性表达**：比表格更具故事性，适合演示和汇报
- **简化复杂时间线**：将冗长的历史或项目进程浓缩为可视化图表

### 与甘特图、流程图的对比

| 图表类型 | 核心特点 | 适用场景 |
|---------|---------|---------|
| **时间线图** | 线性叙事，强调时间顺序 | 历史事件、项目里程碑、产品演进 |
| **甘特图** | 显示任务持续时长和并行关系 | 项目进度管理、资源调度 |
| **流程图** | 展示决策分支和流程走向 | 业务流程、算法逻辑、决策树 |

**关键区别**：时间线图不显示任务的持续时长，只标记事件发生的时点。

### 适用场景

✅ **适合**：
- 产品版本发布历史
- 公司发展里程碑
- 历史/传记事件梳理
- 项目关键节点回顾

❌ **不适合**：
- 需要显示任务持续时长 → 用甘特图
- 需要展示并行任务和依赖关系 → 用甘特图
- 需要展示决策分支 → 用流程图
- 需要展示组织架构 → 用组织架构图

## 最佳实践

### 阶段数量建议

建议控制在 **3-8 个阶段**：

- **少于 3 个**：信息量不足，考虑用列表或表格
- **3-5 个**：最佳可读性，适合演示和汇报
- **6-8 个**：适合详细规划，但需注意排版
- **超过 8 个**：考虑拆分为多个时间线或使用其他图表

### 每阶段事件数量

建议每阶段 **1-5 个事件**：

```
timeline
    title 推荐的事件数量示例
    Q1 : 第一季度
      - 需求调研        ✅ 1-5 个事件最佳
      - 技术选型
      - 架构设计
    Q2 : 第二季度
      - 核心功能开发    ✅ 保持简洁
      - 单元测试
```

**避免过度细分**：
```
timeline
    title ❌ 不推荐：事件过多
    Q1 : 第一季度
      - 需求调研
      - 需求评审
      - 需求确认
      - 技术选型
      - 技术评审
      - 技术确认
      - 架构设计
      - 架构评审
      - ...（太多细节）
```

### 时间跨度的选择

根据内容选择合适的时间粒度：

| 时间跨度 | 推荐粒度 | 示例 |
|---------|---------|------|
| 1 年内 | 月/周 | 季度规划、项目冲刺 |
| 1-5 年 | 季度/月 | 产品路线图、年度计划 |
| 5 年以上 | 年/年代 | 公司历史、行业发展 |

## 常见误区

### 误区一：时间线不是甘特图

❌ **错误理解**：认为时间线可以显示任务持续时长

```
timeline
    title ❌ 时间线无法表达持续时长
    Q1 : 开发阶段（持续3个月）  ← 无法显示"持续"
      - 前端开发
      - 后端开发
```

✅ **正确做法**：时间线只标记时点，需要持续时长请用甘特图

```
gantt
    title ✅ 用甘特图显示持续时长
    dateFormat YYYY-MM
    section 开发
    前端开发     :2024-01, 3M
    后端开发     :2024-01, 3M
```

### 误区二：不要过度细分

❌ **过度细分**：把每个小任务都放上去

```
timeline
    title ❌ 过度细分
    Week1 : 第一周
      - 周一开会
      - 周二写文档
      - 周三写代码
      - 周四测试
      - 周五部署
    Week2 : 第二周
      - 周一开会
      - ...
```

✅ **适度概括**：聚焦关键里程碑

```
timeline
    title ✅ 聚焦关键节点
    Week1 : 第一周
      - 完成需求评审
      - 启动开发
    Week2 : 第二周
      - 完成核心功能
      - 通过测试
```

### 误区三：时间线不是流程图

时间线强调**时间顺序**，流程图强调**逻辑分支**：

- 需要展示"如果...那么..."的决策逻辑 → 用流程图
- 需要展示"先发生...然后发生..."的时间顺序 → 用时间线

## 速查表

| 语法 | 功能 |
|------|------|
| `timeline` | 声明时间线图 |
| `title 标题` | 设置图表标题 |
| `阶段名称 : 描述` | 定义时间线阶段 |
| `- 事件` | 阶段内的事件 |
| `%% 注释` | 行注释 |

## 下一步

掌握时间线图后，继续学习 [Mermaid 思维导图](mindmap.html)，用于组织思路和信息架构设计。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
