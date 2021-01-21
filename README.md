# dream-builder
轻量级中后台前端可视化搭建平台
- 通过[sui框架](https://github.com/tangzhirong/sui-core.git)集成，支持与第三方react框架插件化集成（如：[icejs](https://github.com/alibaba/ice)）
- 不限制任何组件库，默认支持: [sui-components](https://github.com/tangzhirong/sui-components.git)、antd
- 插件化集成，支持第三方能力扩展
- 提供丰富的组件、模版与物料
- 拥有强大的页面编排能力
- 智能生成lowcode前端代码

# 使用文档(暂未开放)
[在线文档](/)

# 项目启动
## 全局项目
```
npm install

npm start
```
按序加载并启动插件，默认集成插件包括：
- plugin-sui-core：内部react框架sui内核
- plugin-web-editor：web编辑器
- plugin-react-template：react组件库与模版，默认支持下面两个，后续支持以npm方式引入
  - antd
  - sui-components
- plugin-store: 全局状态管理
## web editor 子项目
- 启动平台管理服务
```

cd ／packages/plugin-web-editor/client-view

npm install

npm start
```
- 启动web编辑器服务
```

cd ／packages/plugin-web-editor/client-core

npm install

npm start
```

# 项目结构
- config：全局配置文件
- docs：项目文档
- packages：项目执行引擎与核心插件
  - create-dream：项目初始化与插件加载机制
  - plugin-config：全局配置插件（重构中）
  - plugin-react-template：react组件模版，目前支持：antd、sui-components组件库（重构中）
  - plugin-router：路由插件（待开发）
  - plugin-store：全局数据与状态管理（重构中）
  - plugin-sui-core: sui框架内核
  - plugin-web-editor：web编辑器插件
    - client-core: Web Editor Core，编辑器核心代码
    - client-view: 编辑器视图层，包括：团队、项目、页面管理等
    - server：node后端服务，数据持久化
- scripts：项目启动、构建脚本

# Web Editor Core 核心结构
- config：全局配置文件，包括：webpack、测试、环境配置等；
- scripts： 项目启动、构建脚本
- src：源文件
  - common：通用样式与工具方法
  - components：编辑器组件，包括：路由、错误处理、布局组合器、物料属性配置栏、物料管理栏、渲染树、样式编辑器等；
  - context：全局context对象，维护共享数据（EventBus事件系统、AST树等）
  - core:底层数据结构，主要包括：AST树、执行引擎、request请求等基类
  - layout：布局容器
  - materials：物料库
  - pages：编辑器页面
  - render：渲染引擎
  - eventManager.ts:事件系统
  - index.tsx:系统主页面，加载JS执行引擎和渲染引擎
 
 # Todo
 - 组件导入方式：支持以npm方式导入任意react组件库
 - 页面预览改为node后台渲染
 - 自由画布实现
 - 服务端交互增强：支持api文档生成接口层代码
