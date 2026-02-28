export const DEFAULT_CODE = `graph TD
    A[开始 Start] --> B{判断 Decision}
    B -->|是 Yes| C[成功 OK]
    B -->|否 No| D[失败 Fail]
    C --> E[结束 End]
    D --> E`;

export const EXAMPLES = [
  { label: '流程图', code: 'graph TD\n    A[开始] --> B{判断}\n    B -->|是| C[成功]\n    B -->|否| D[失败]\n    C --> E[结束]\n    D --> E' },
  { label: '时序图', code: 'sequenceDiagram\n    participant 用户\n    participant 服务器\n    用户->>服务器: 请求\n    服务器-->>用户: 响应' },
  { label: '类图', code: 'classDiagram\n    class Animal {\n        +String name\n        +makeSound()\n    }\n    class Dog {\n        +fetch()\n    }\n    Animal <|-- Dog' },
  { label: '甘特图', code: 'gantt\n    title 项目计划\n    dateFormat YYYY-MM-DD\n    section 阶段一\n    设计: 2024-01-01, 7d\n    开发: 2024-01-08, 14d\n    section 阶段二\n    测试: 2024-01-22, 7d' },
  { label: '饼图', code: 'pie title 占比\n    "A" : 40\n    "B" : 30\n    "C" : 20\n    "D" : 10' },
  { label: '思维导图', code: 'mindmap\n  root((核心))\n    分支一\n      子节点1\n      子节点2\n    分支二\n      子节点3' },
  { label: 'ER 图', code: 'erDiagram\n    USER ||--o{ ORDER : places\n    ORDER ||--|{ LINE-ITEM : contains\n    PRODUCT ||--o{ LINE-ITEM : includes' },
  { label: '状态图', code: 'stateDiagram-v2\n    [*] --> 空闲\n    空闲 --> 运行中 : 启动\n    运行中 --> 暂停 : 暂停\n    暂停 --> 运行中 : 恢复\n    运行中 --> [*] : 停止' },
  { label: '架构图', code: 'graph LR\n    subgraph 前端\n        A[浏览器]\n    end\n    subgraph 后端\n        B[API]\n        C[数据库]\n    end\n    A -->|HTTP| B\n    B -->|SQL| C' },
];
