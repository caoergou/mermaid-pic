---
title: 如何用 Mermaid 画思维导图
description: 深入讲解 Mermaid 思维导图的节点层级、分支结构、主题设置等语法，附项目管理思路的完整实战示例。
date: 2026-03-05
slug: mindmap
---

# 如何用 Mermaid 画思维导图

<span class="post-meta">2026-03-05 · MermZen 教程

思维导图用于组织思路、展示信息架构、帮助理解复杂概念之间的关系，适合头脑风暴、项目规划、知识管理等场景。Mermaid 使用 `mindmap` 关键字声明思维导图。

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslLKzcxLyU0siMlTUFBQKMrPL9HQeLJj7dP9zU927H65aIamplItAIBmEvA" width="100%" height="600" frameborder="0"></iframe>

## 声明图表

使用 `mindmap` 关键字：

```
mindmap
    root((中心主题))
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslLKzcxLyU0siMlTUFBQKMrPL9HQeLJj7dP9zU927H65aIamplItAIBmEvA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 基本结构

创建包含主节点和子节点的思维导图：

```
mindmap
    root((项目管理))
        计划
            需求分析
            任务分解
            时间安排
        执行
            团队协作
            进度跟踪
            问题解决
        控制
            质量检查
            风险评估
            变更管理
        收尾
            项目验收
            经验总结
            文档归档
```
<a href="https://eric.run.place/MermZen/#eJxdkM1qwkAUhV8lzErBlUufpZvSbrpQSyndiBBKibHYRKw0KZGGcWijLkZLQ_ozVV8m987MW0jqosmc3b3n8t3D6ZEb0mo2yBlpkfZF57x9ennSsSzLuup2r2s1Tb9lxCWncuzU60enkOIU3Mn_XEjPbHy_BdfBl3HVyYWAewquoxJWdTDIdJACH6JXouEwUXRUvYRorsMYHvx8O6s6ah_Bz5v6jNXXykgUcD0PVcLA-SjRvQTczGCkCz3wkdkYvxoM5unnpVrf5b8bI5EfYpQeuynRpxlsdgbjr0W9GuHU-CuFX6xtIcWj0czTACmD7QQpI_0DI4StaA" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 层级结构

支持多层级节点和嵌套结构：

```
mindmap
    root((软件开发))
        前端开发
            HTML
                语义化标签
                结构优化
            CSS
                响应式设计
                Flex/Grid
            JavaScript
                ES6+
                DOM 操作
        后端开发
            Node.js
                Express
                Koa
            Python
                Django
                Flask
            数据库
                SQL
                NoSQL
        测试
            单元测试
            集成测试
            自动化测试
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslLKzcxLyU0siMlTUFBQKMrPL9HQeLF3_ZPd257uaXjaP1FTEyIDAk87e5-vXg8RR4iCgEeIrw-qCAi8WL_2yc7Opz3Tni1of752H6aC57snP5vX8mTPjKc901BlnYODMZU_ndz7dNeUp3v6X6zb92LdQkwFbjmpFfruRZkpqFJeiWWJwclFmQUlmFpcg820MUVd_H0Vnk3ufbJ3DpLvJ_Th8L1ffkqqXlYxFsMrCopSi7FIeOcnogoGVJZk5OdhcUhWYl56PjafJhZnowo_m7rhWe-6p7smY6oODsQSO375KMLPtna_WD8VVdnT3qlPW5uxybyc3fasYwI2mRftq552rQBFOlhSqRYAzpfC1w" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 完整示例：项目管理思路

```
mindmap
    root((项目管理思维导图))
        项目启动
            确定目标
                SMART 原则
                成功标准
            利益相关者
                识别
                沟通计划
            章程
                项目范围
                约束条件
        项目规划
            需求分析
                用户需求
                功能需求
            任务分解
                WBS
                依赖关系
            时间管理
                甘特图
                关键路径
            资源规划
                人力资源
                预算
        项目执行
            团队管理
                角色分配
                协作工具
            沟通管理
                会议
                报告
            质量保证
                标准
                检查
        项目监控
            进度控制
                偏差分析
                调整
            风险管理
                识别
                评估
                应对
            变更管理
                请求
                审批
        项目收尾
            验收
                用户验收
                最终交付
            评估
                绩效
                经验教训
            归档
                文档
                知识
```
<a href="https://eric.run.place/MermZen/#eJx1U01v2kAQ_SvIp0Tqqcfc2nsvTaVeeqnaSw9JqqrqparkFGwWlwBBED4WahxKDI26poHgYgP5M57Z9b-owJUq1us5zpuZffP2zWftk3b0-JH2RjvSTt6dvj15_f7VaS6Xy304O_t4cBA7S04ZZw6vmaj3eTgHbwV0c3iYVG0jqYGaB9b4f3Yb3GHAupwyHBT3kW0cP3vy_EUOKjaQThpFUgPLxkERiuY-CmTCqcXpHzBmQjfSrcIzgdwqRt7Zsd4VzAFSl4jeDvj4W7ojWU2U80DnaZQHN9i3se9E4UKWQ7iF1CtxT8ffX4GY-L2mmNYYI_GTmjQKli3yaxUahSFYDhBTuMN038unx-lktOmL-yswZnwW7qPYWsStefLfKoptXloC3Sj4GbO4wYTvwaawj4r7AgY1lR47KkEAFk1qFPpfFzhrydpiyRVOWTIFvY7bdhZx4dZF6Q6IGRsXCu4X1WjdA38Ehi_JsXNM1tRo1RWMKXxmjeDSklSYj-NiNXroC-9c0aGw-S4_1NEeyftzeokVV5r_QCG4wYoLZKHY8LwKPstynpjmsSn5Ox5W4s4kU8-MCxNeIVpNFe8HDfCW0o9V20gzrSY8X30HzMHSMuWIxgKmkivjn2VsKLT4d2cZKPZ0HpIo-BGFbUnhjN14OMEmUeWr20eaHcF-SZuv6-gobhWviso8t0fCM7UvfwGmsRdM" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 速查表

| 语法 | 功能 |
|------|------|
| `mindmap` | 声明思维导图 |
| `root((中心主题))` | 根节点（中心主题） |
| `子节点` | 一级子节点 |
| `    孙子节点` | 二级子节点（缩进） |
| `        曾孙节点` | 更高级别的子节点 |
| `%% 注释` | 行注释 |

## 下一步

掌握思维导图后，继续学习 [Mermaid XY 图](xy.html)，用于数据可视化和趋势分析。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
