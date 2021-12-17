# dream-builder
轻量级中后台前端可视化搭建平台
- 面向中后台系统搭建
- 不限制任何react组件库，默认支持: [sui-components](https://github.com/tangzhirong/sui-components.git)、antd
- 开箱即用，提供丰富的组件、模版与物料
- 拥有强大的页面编排能力
- 智能生成lowcode前端代码
- 轻量化，接入成本低，可拓展

# 基础特性
- react组件库接入
- 页面布局与编排能力
- 组件基础属性编辑能力
- 组件静态数据、状态、方法的编辑能力
- 组件扩展属性编辑能力，如：显隐、循环、样式等
# 使用文档(搭建中)
[在线文档](/)

# 使用方法
- 安装依赖
```
npm install
```

- 导入自己的npm组件库
```
npm run import:tdesign-react
```
- 启动项目：

```
npm start
```

# 项目结构
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
 - 支持导入任意npm组件库
 - 页面预览改为node后台渲染
 - 自由画布实现
 - 服务端交互增强：支持api文档生成接口层代码
 - vscode集成
