---
title: 如何用 Mermaid 画 Git 图
description: 深入讲解 Mermaid Git 图的分支创建、提交、合并、标签等语法，附版本控制流程的完整实战示例。
date: 2026-03-05
slug: gitgraph
---

# 如何用 Mermaid 画 Git 图

<span class="post-meta">2026-03-05 · MermZen 教程

Git 图用于可视化版本控制系统的分支管理、提交历史和合并操作，适合软件开发团队协作、项目管理、版本控制教学等场景。Mermaid 使用 `gitGraph` 关键字声明 Git 图。

<iframe src="https://eric.run.place/MermZen/embed.html#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJU1BQUCjJLMlJVXDPLFF4OnvfswXtLxfNUKoFAGesEeQ" width="100%" height="600" frameborder="0"></iframe>

## 声明图表

使用 `gitGraph` 关键字：

```
gitGraph
    title Git 图标题
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJU1BQUCjJLMlJVXDPLFF4OnvfswXtLxfNUKoFAGesEeQ" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 基本提交和分支

创建简单的提交和分支：

```
gitGraph
    title 基本 Git 图
    commit "初始提交"
    commit "功能 A"
    branch 功能分支1
    commit "完成功能 1"
    commit "修复 bug 1"
    checkout main
    branch 功能分支2
    commit "完成功能 2"
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJU1BQUCjJLMlJVXg6f9ezOWsU3DNLFJ7O3geRSc7Pzc0sUYhRetox9-ny7mf9E57sWhKjhC7ZNf9F814FR5hEUlFiXnKGAkT4aUfbsynrDdG1rOt51jEBqtEQw8Qn-9c9XdKrkFSajiSZkZqcnV9aopCbmJmH0yIjfBYZxSgp1QIAx1huZQ" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 分支合并

演示分支合并操作：

```
gitGraph
    title 分支合并示例
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
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJU1BQUCjJLMlJVXja0fZsyvqnEzqe7tz2fMmuJ_u6IbLJ-bm5mSUQdlJRYl5yhkJaamJJaVGqriGmChR2Rmpydn5piUJuYmYeVgOMSDYgN7UoPRWfA1AVGCnVAgDhnlab" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 标签和版本

添加标签和版本管理：

```
gitGraph
    title 版本管理示例
    commit "v1.0.0 发布"
    branch feature/auth
    commit "添加认证功能"
    commit "修复安全漏洞"
    checkout main
    merge feature/auth tag: "v1.1.0"
    branch hotfix/security
    commit "紧急安全修复"
    checkout main
    merge hotfix/security tag: "v1.1.1"
```
<a href="https://eric.run.place/MermZen/#eJyrVipTsjLSUUpWslJKzyxxL0osyIjJU1BQUCjJLMlJVXje2fFszprn6xY-n9D2fMmuJ_u6IbLJ-bm5mSUKMUplhnoGegYKT_snPt3RHKMEkU0qSsxLzlBIS00sKS1K1U8sLclA0_Zs--6nXQterFvyYn3j0675L5r3wvTClTzZv-7pkt6n6zqftq54tqf_2ZZ5cCUZqcnZ-aUlCrmJmXkQodzUovRUFAsVShLTrSAONNQzQHNZRn5JWmaFfnFqcmlRZkklms3Ptyx_1rAUYjPEFQRtRjMQxXLDGCWlWgD525DX" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 完整示例：产品开发流程

```
gitGraph
    title 产品开发 Git 流程图
    commit "项目初始化"
    commit "基础架构搭建"
    branch feature/login
    commit "登录功能实现"
    commit "登录 UI 优化"
    checkout main
    branch feature/dashboard
    commit "仪表板框架"
    commit "数据可视化组件"
    commit "用户统计功能"
    checkout main
    branch feature/settings
    commit "用户设置页面"
    commit "安全设置"
    checkout main
    merge feature/login tag: "v1.0.0-beta"
    commit "测试修复"
    merge feature/dashboard
    merge feature/settings tag: "v1.0.0"
    branch hotfix/performance
    commit "优化加载速度"
    commit "减少内存泄漏"
    checkout main
    merge hotfix/performance tag: "v1.0.1"
```
<a href="https://eric.run.place/MermZen/#eJyNUt9KwlAcfpXDua6sLn2B6AG6281xHbeR22QeI4hASe2PlUkpRqgtIiVoCWGRc_oy-50z3yJIhLZFdf195_v3O_t4FyfXl7CMk1jR2IZFsqpkIIQQ01iGIn_Ug6sijAtQq6MNjSE-LIp-FW4nc5Zs6rrGkIRn9oe4deC4Db0qnDUlHMGhOxJ2gXfeeKfEL5_BHS0oKYsYsorSlLC8RRMZU9GMyGNx44LXgNNucOiB0xEXg5j-nIK2NpE_bn0PoFJ5x8wzpJOFbMRwm-TUlEms7Yii7z4Fdp-3p9yu8M5bzJE3BvzcgdpL0KvAWVO4Jd-Ns8R1nx-_C7cbOPa8wP-T5ShjmqHkfpQMnInwnJk9nLXv42s7J1Duzym_-OnUUmh4ecSIkkQS3l1bWV1ZXU5RRuLNh9XgpeFPHXg4X4BhqcimYXBRK2wV-Q6qydLaXiJLrbRp6cSQafQ8X2eG07vA82aFLowe4ysc1WBQh0oZnlv8tcTHtT-3iNuGUq5JGB98AkJmW9Y" target="_blank" rel="noopener" class="try-in-editor">在 MermZen 中试试 →</a>

## 速查表

| 语法 | 功能 |
|------|------|
| `gitGraph` | 声明 Git 图 |
| `title 标题` | 设置图表标题 |
| `commit "信息"` | 创建提交节点 |
| `branch 分支名` | 创建分支 |
| `checkout 分支名` | 切换分支 |
| `merge 分支名` | 合并分支 |
| `merge 分支名 tag: "版本号"` | 合并并打标签 |
| `%% 注释` | 行注释 |

## 下一步

掌握 Git 图后，您可以继续学习其他 Mermaid 图表类型，或查看我们的 [Mermaid 图表速查表](../cheat-sheet.html) 获取完整的语法参考。

---

如果您想在 MermZen 中尝试上述代码，可以点击 [在线编辑器](https://eric.run.place/MermZen/)，然后将代码粘贴进去。
