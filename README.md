# dream-builder
轻量级中后台前端可视化搭建平台，不限制任何组件库和框架，插件化集成，拥有强大的页面编排能力

# 使用文档
[在线文档](/)

# 项目启动
## 全局项目
```
npm install

npm start
```
## web editor 子项目
```

cd ／packages/plugin-web-editor/client-view

npm install

npm start
```

# 项目结构
- config：全局配置文件
- docs：项目文档
- packages：项目执行引擎与核心插件
  - create-dream
  - plugin-config
  - plugin-react-template
  - plugin-router
  - plugin-web-editor
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
 