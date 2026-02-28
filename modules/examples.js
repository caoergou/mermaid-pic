export const DEFAULT_CODE = `graph TD
    A[开始 Start] --> B{判断 Decision}
    B -->|是 Yes| C[成功 OK]
    B -->|否 No| D[失败 Fail]
    C --> E[结束 End]
    D --> E`;

export const EXAMPLES_ZH = [
  { label: '流程图', code: 'graph TD\n    A[开始] --> B{判断}\n    B -->|是| C[成功]\n    B -->|否| D[失败]\n    C --> E[结束]\n    D --> E' },
  { label: '时序图', code: 'sequenceDiagram\n    participant 用户\n    participant 服务器\n    用户->>服务器: 请求\n    服务器-->>用户: 响应' },
  { label: '类图', code: 'classDiagram\n    class Animal {\n        +String name\n        +makeSound()\n    }\n    class Dog {\n        +fetch()\n    }\n    Animal <|-- Dog' },
  { label: '甘特图', code: 'gantt\n    title 项目计划\n    dateFormat YYYY-MM-DD\n    section 阶段一\n    设计: 2024-01-01, 7d\n    开发: 2024-01-08, 14d\n    section 阶段二\n    测试: 2024-01-22, 7d' },
  { label: '饼图', code: 'pie title 占比\n    "A" : 40\n    "B" : 30\n    "C" : 20\n    "D" : 10' },
  { label: '思维导图', code: 'mindmap\n  root((核心))\n    分支一\n      子节点1\n      子节点2\n    分支二\n      子节点3' },
  { label: 'ER 图', code: 'erDiagram\n    USER ||--o{ ORDER : places\n    ORDER ||--|{ LINE-ITEM : contains\n    PRODUCT ||--o{ LINE-ITEM : includes' },
  { label: '状态图', code: 'stateDiagram-v2\n    [*] --> 空闲\n    空闲 --> 运行中 : 启动\n    运行中 --> 暂停 : 暂停\n    暂停 --> 运行中 : 恢复\n    运行中 --> [*] : 停止' },
  { label: '架构图', code: 'architecture-beta\n    group api(cloud)[Cloud API]\n    group backend(server)[Backend Services] in api\n    group storage(disk)[Storage Layer] in api\n\n    service gateway(internet)[Gateway] in api\n    service app(server)[App Server] in backend\n    service worker(server)[Worker] in backend\n    service db(database)[Database] in storage\n    service cache(database)[Cache] in storage\n\n    gateway:R --> L:app\n    gateway:R --> L:worker\n    app:B --> T:db\n    worker:B --> T:db\n    app:B --> T:cache' },
  { label: 'Git 图', code: 'gitGraph\n    commit\n    commit\n    branch develop\n    checkout develop\n    commit\n    commit\n    checkout main\n    merge develop\n    commit\n    branch feature\n    checkout feature\n    commit\n    checkout develop\n    merge feature\n    checkout main\n    merge develop' },
  { label: '块图', code: 'block-beta\n    columns 3\n    Frontend blockArrowId6<["  "]>(right) Backend\n    space:3\n    A["Mobile App"]  B["Web App"] space\n    space:3\n    C("API Gateway"):3\n    space:3\n    D["Auth Service"] E["User Service"] F["Data Service"]\n    space:3\n    db[("Database")]:3' },
];

export const EXAMPLES_EN = [
  { label: 'Flowchart', code: 'graph TD\n    A[Start] --> B{Decision}\n    B -->|Yes| C[Success]\n    B -->|No| D[Failure]\n    C --> E[End]\n    D --> E' },
  { label: 'Sequence', code: 'sequenceDiagram\n    participant User\n    participant Server\n    User->>Server: Request\n    Server-->>User: Response' },
  { label: 'Class', code: 'classDiagram\n    class Animal {\n        +String name\n        +makeSound()\n    }\n    class Dog {\n        +fetch()\n    }\n    Animal <|-- Dog' },
  { label: 'Gantt', code: 'gantt\n    title Project Plan\n    dateFormat YYYY-MM-DD\n    section Phase 1\n    Design: 2024-01-01, 7d\n    Dev: 2024-01-08, 14d\n    section Phase 2\n    Test: 2024-01-22, 7d' },
  { label: 'Pie', code: 'pie title Distribution\n    "A" : 40\n    "B" : 30\n    "C" : 20\n    "D" : 10' },
  { label: 'Mindmap', code: 'mindmap\n  root((Core))\n    Branch 1\n      Node 1\n      Node 2\n    Branch 2\n      Node 3' },
  { label: 'ER Diagram', code: 'erDiagram\n    USER ||--o{ ORDER : places\n    ORDER ||--|{ LINE-ITEM : contains\n    PRODUCT ||--o{ LINE-ITEM : includes' },
  { label: 'State', code: 'stateDiagram-v2\n    [*] --> Idle\n    Idle --> Running : Start\n    Running --> Paused : Pause\n    Paused --> Running : Resume\n    Running --> [*] : Stop' },
  { label: 'Architecture', code: 'architecture-beta\n    group api(cloud)[Cloud API]\n    group backend(server)[Backend Services] in api\n    group storage(disk)[Storage Layer] in api\n\n    service gateway(internet)[Gateway] in api\n    service app(server)[App Server] in backend\n    service worker(server)[Worker] in backend\n    service db(database)[Database] in storage\n    service cache(database)[Cache] in storage\n\n    gateway:R --> L:app\n    gateway:R --> L:worker\n    app:B --> T:db\n    worker:B --> T:db\n    app:B --> T:cache' },
  { label: 'Git Graph', code: 'gitGraph\n    commit\n    commit\n    branch develop\n    checkout develop\n    commit\n    commit\n    checkout main\n    merge develop\n    commit\n    branch feature\n    checkout feature\n    commit\n    checkout develop\n    merge feature\n    checkout main\n    merge develop' },
  { label: 'Block', code: 'block-beta\n    columns 3\n    Frontend blockArrowId6<["  "]>(right) Backend\n    space:3\n    A["Mobile App"]  B["Web App"] space\n    space:3\n    C("API Gateway"):3\n    space:3\n    D["Auth Service"] E["User Service"] F["Data Service"]\n    space:3\n    db[("Database")]:3' },
];
