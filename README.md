# dream-builder

## 轻量级中后台前端可视化搭建系统

- 面向中后台系统搭建
- 不限制任何 react 组件库，默认内置常用业务组件: [sui-components](https://github.com/tangzhirong/sui-components.git)、antd
- 开箱即用，提供丰富的组件、模版与物料
- 提供组件属性编辑和页面编排能力
- 轻量化，接入成本低，可拓展

# 基础特性

- react 组件库标准协议接入
- 页面布局与编排能力
- 组件基础属性编辑能力
- 组件静态数据、状态、方法的编辑能力
- 组件扩展属性编辑能力，如：显隐、循环、样式等

# 官网

[在线文档](http://43.138.105.171/dream-builder)

# 如何使用

- 克隆项目

```
git clone https://github.com/BigFishTeam/dream-builder.git
```

- 安装依赖

```
npm install
```

- 启动项目：

```
npm start
```

- 快速开始

```
创建项目 -> 进入项目 -> 搭建页面 -> 发布上线
```

# 项目结构

- config：全局配置文件，包括：webpack、测试、环境配置等；
- scripts： 项目启动、构建脚本
- src：源文件
  - common：通用样式与工具方法
  - components：编辑器组件，包括：路由、错误处理、布局组合器、物料属性配置栏、物料管理栏、渲染树、样式编辑器等；
  - context：全局 context 对象，维护共享数据（EventBus 事件系统、AST 树等）
  - core:底层数据结构，主要包括：AST 树、执行引擎、request 请求等基类
  - layout：布局容器
  - materials：物料库
  - pages：编辑器页面
  - render：渲染引擎
  - eventManager.ts:事件系统
  - index.tsx:系统主页面，加载 JS 执行引擎和渲染引擎

# Todo

- 支持导入任意 npm 组件库
- schema 协议拓展，支持 lowcode 代码生成能力
- 自由画布实现
- 服务端交互增强：支持 api 文档生成接口层代码
- vscode 插件集成
