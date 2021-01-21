/**
 * @summary 这个文件是整个系统的 “抽象语法树” 的处理部分
 *          共分为三大类  AstParser AstNode ConfigItem
 *          其中 1.AstParser 类负责绝大多数的 Ast 解析和操作，也包括历史记录的保存
 *              2.AstNode 类负责接收物料库的参数，用以简单的生成 AstParser 中需要的节点类型
 *              3.ConfigItem 类负责简易的生成符合 Config 规范要求的 config
 *
 *          这个 “抽象语法树” 在整个系统中的作用:
 *              1.记录布局信息
 *              2.记录历史操作记录
 *              3.后端存储
 *              4.记录数据以及事件信息
 *
 *          渲染引擎和此处的关系
 *              1.渲染引擎根据此处的信息进行组件树的构建
 *              2.渲染引擎根据此处的状态和方法信息，注入全局状态和方法
 */
import _ from 'lodash';
import {
  sizeStateType,
  directionStateType,
  animateStateType,
  backgroundStateType,
  fontStateType,
} from '../components/materialConfiger/components/styleEditor';
import Utils from '../common/utils/utils';
const { GGErrorLogger, uuid } = Utils;

export type astNodeStyleType = {
  size: sizeStateType;
  margin: directionStateType;
  padding: directionStateType;
  font: fontStateType;
  background: backgroundStateType;
  animations: animateStateType;
};

/**
 * 每个component的类型
 */
export interface AstNodeType {
  /**
   * node 的名称
   **/
  name: string;

  /**
   * 是否为布局 node
   **/
  isLayoutNode: boolean;

  /**
   * node 的容纳能力
   **/
  layoutCapacity: number;

  /**
   * 放置 node 需求的能力
   **/
  nodeDemandCapacity: number;

  /**
   * node 的类型
   **/
  type: string;

  /**
   * node 的id
   **/
  id: string;

  /**
   * node 相关的 states 的 id 数组
   **/
  states: string[];

  /**
   * node 相关的配置
   **/
  config: ConfigType;

  /**
   * node 的父节点 可选项
   **/
  parentNode?: string;

  /**
   * node 的子节点 可选项
   **/
  children?: AstNodeType[];

  /**
   * node 的下一个兄弟节点 可选项
   **/
  nextNode?: string;

  /**
   * node 的上一个兄弟节点 可选项
   **/
  prevNode?: string;

  /**
   * 插槽的数量，用于布局组合器
   */
  slot?: number;

  /**
   * node 关联的方法 ids
   **/
  methods: string[];

  /**
   * 是否为一级节点
   */
  isFirstLevelNode: boolean;

  /**
   * 对父页面的引用 这里应该是id
   */
  parentPage?: string;

  /**
   * 物料包裹的样式
   */
  style?: astNodeStyleType;
}

/**
 * 用以描述 state 的数据类型
 */
type StateType = {
  id: string;
  /**
   * 引用此 state 的 node 的 id 数组
   */
  relatedNodeId: string[];
  /**
   * 此 state 的名称
   */
  name: string;
  /**
   * 此 state 的初始值
   */
  initValue: any;
};

type MethodType = {
  id: string;
  name: string;
  relatedNodeId: string[];
  listen?: string[];
  emit?: string[];
  methodCode: string;
};

export type StaticConfigValue = {
  type: 'static';
  value: any;
};

export type StateConfigValue = {
  type: 'state';
  stateId: string;
};

export type MethodConfigValue = {
  type: 'method';
  methodId: string;
};

type ConfigValueType = StateConfigValue | StaticConfigValue | MethodConfigValue;

export type ConfigType = {
  [configKey: string]: ConfigValueType;
};

type HistoryType = {
  id: string;

  // 保留的 JSON 化的 AST 信息
  ast: string;

  // 每次操作的记录
  msg: any;

  // 每次操作的时间
  time: Date;
};

type PageType = {
  id: string;

  // 页面描述名称
  name: string;

  // 是否为首页
  isIndex: boolean;

  // 页面路由
  path: string;

  // 页面组件列表
  components?: AstNodeType[];

  baseLayout?: any;
};

export type CustomLayout = {
  name: string;
  layouts: {
    type: 'row' | 'span';
    count: number;
  }[];
};

/**
 * 根节点类型
 */
type AstType = {
  /**
   * 所有的页面
   */
  pages?: PageType[];

  /**
   * 所有的方法
   */
  methods?: MethodType[];

  /**
   * 所有的属性
   */
  states?: StateType[];

  /**
   * 自定义布局
   */
  customLayout?: CustomLayout[];
};

// TODO: 替换搜索方法
/**
 *  TODO: 1.编写 AstNode 类和 ConfigItem 类的实现
 *        2.AstNode 类和物料库进行关联，物料库类的配置传入 AstNode 类生成符合 AstNodeType 规范要求的数据结构
 *        3.ConfigItem 类是用来进行生成符合 config 配置项的要求规范的数据结构的类
 *        4.工厂方法位于 AstParser 类中
 **/
class AstNode implements AstNodeType {
  public id: string;
  public name: string;
  public isLayoutNode: boolean;
  public layoutCapacity: number;
  public nodeDemandCapacity: number;
  public type: string;
  public states: string[] = [];
  public config: ConfigType = {};
  public parentNode: string | undefined = undefined;
  public parentPage: string | undefined = undefined;
  public children: AstNodeType[] = [];
  public nextNode: string | undefined = undefined;
  public prevNode: string | undefined = undefined;
  public methods: string[] = [];
  public isFirstLevelNode = false;

  constructor(
    config: Omit<
      AstNodeType,
      | 'id'
      | 'nextNode'
      | 'prevNode'
      | 'method'
      | 'states'
      | 'children'
      | 'isFirstLevelNode'
      | 'parentPage'
      | 'config'
      | 'parentNode'
      | 'methods'
    >,
  ) {
    this.id = uuid();
    const { layoutCapacity, isLayoutNode, nodeDemandCapacity, type, name } = config;
    this.isLayoutNode = isLayoutNode;
    this.layoutCapacity = layoutCapacity;
    this.nodeDemandCapacity = nodeDemandCapacity;
    this.type = type;
    this.name = name;
  }
}

class ConfigItem<T> {
  public type: 'static' | 'state' | 'method' | undefined;
  constructor(type: 'static' | 'state' | 'method') {
    this.type = type;
  }
}

class StaticConfigItem extends ConfigItem<any> {
  public value: any;
  constructor(value: any) {
    super('static');
    this.value = value;
  }
}

class StateConfigItem extends ConfigItem<string> {
  public stateId: string;
  constructor(stateId: string) {
    super('state');
    this.stateId = stateId;
  }
}

class MethodConfigItem extends ConfigItem<string> {
  public methodId: string;
  constructor(methodId: string) {
    super('method');
    this.methodId = methodId;
  }
}

/**
 * AstParser 类
 * 解析与操作 系统的 AST 的类
 * TODO: 1.完成工厂函数
 * FIXME: 1.修复逻辑有误的地方
 */
class AstParser {
  /**
   * 构造函数
   * @param initAst 初始化的 Ast 字符串
   * @param astSetter 外界的 ast 修改触发函数
   */
  constructor(initAst: string, astSetter: (ast: string) => void, listener?: (func: any) => void) {
    this.ast = initAst;
    this.astSetter = astSetter;
    this.safeParser();
    if (listener) this.listener = listener;
  }

  /**
   * 劫持 getter 方便的获取 ast 结构
   */
  get tree(): AstType {
    if (this.astTree) return this.astTree;

    return {};
  }

  private ast = '';
  private listener: any;

  // 历史记录
  private history: HistoryType[] = [];
  private astSetter: (ast: string) => void = (ast: string) => {};
  private astTree: AstType = {};

  // 当前选中的页面
  private selectPage: string | null = null;

  /**
   * 注册所有的ast相关事件
   */
  public registerAllParserEvents(eventManager: { listen: (fc: string, cb: any) => any }) {
    eventManager.listen('ast:createComposeLayout', (layoutData: any) => {});
  }

  /**
   * 安全的ast解析
   */
  private safeParser() {
    try {
      const parsedAst = JSON.parse(this.ast);
      this.astTree = parsedAst;
    } catch (e) {
      GGErrorLogger('解析错误');
      console.error(e);
    }
  }

  /**
   * 保存至历史记录
   * @param msg 当前操作备注信息
   */
  private save(msg: any) {
    this.history.push({
      id: uuid(),
      ast: this.ast,
      msg,
      time: new Date(),
    });
    const formattedAst = JSON.stringify(this.astTree);
    this.ast = formattedAst;
    this.astSetter(formattedAst);
    if (this.listener) this.listener(this);
  }

  private hasSlots(nodeId: string) {
    const aimNode = this.getNodeById(nodeId);
    if (aimNode) {
      return aimNode.slot ? true : false;
    }
    return false;
  }

  /**
   * 检测是否为有效的AST node节点
   * @param node
   */
  private isUsefulNodeType(node: Record<string, any>): boolean {
    if (_.has(node, 'type') && _.has(node, 'isLayoutNode')) return true;

    return false;
  }

  /**
   * 深搜的内层依赖方法
   * @param cmp
   * @param resultArray
   */
  private walkInComponent(cmp: AstNodeType) {
    let resultArray: AstNodeType[] = [];
    if (cmp.isLayoutNode && cmp.children && cmp.children.length > 0) {
      resultArray = [...resultArray, ...cmp.children];
      cmp.children.forEach(component => {
        resultArray = [...resultArray, ...this.walkInComponent(component)];
      });
    }
    return resultArray;
  }

  /**
   * FIX: resultArray 数组赋值有问题
   * 深搜的外层依赖方法
   * @param page
   * @param resultArray
   */
  private walkIn(page: PageType) {
    let resultArray: AstNodeType[] = [];
    if (page.components) {
      resultArray = [...resultArray, ...page.components];
      page.components.forEach(cmp => {
        resultArray = [...resultArray, ...this.walkInComponent(cmp)];
      });
    }
    return resultArray;
  }

  public resetAst(ast: string) {
    this.history.push({
      id: uuid(),
      ast: this.ast,
      msg: '重置到指定的Schema',
      time: new Date(),
    });
    this.ast = ast;
    this.safeParser();
  }

  public getMethodById(id: string) {
    if (this.astTree.methods) {
      const filterMethod = this.astTree.methods.filter(method => {
        return method.id === id;
      });
      if (filterMethod.length > 0) return filterMethod[0];
    }
    return null;
  }

  public changeMethodById(id: string, newMethodCode: any) {
    const filterMethod = this.getMethodById(id);
    if (filterMethod) {
      filterMethod.methodCode = newMethodCode;
      return true;
    }
    return false;
  }

  public getRelatedMethods(node: AstNodeType) {
    if (this.isUsefulNodeType(node)) return node.methods.map(id => this.getMethodById(id));

    return null;
  }

  public appendMethod(method: string, name: string, node: AstNodeType) {
    if (!this.isUsefulNodeType(node)) {
      GGErrorLogger('不是有效的节点');
      console.trace();
      return;
    }
    if (!this.astTree.methods) this.astTree.methods = [];

    const uid = uuid();
    const nodeId = node.id;
    const methodOption = {
      id: uid,
      name,
      relatedNodeId: [nodeId],
      methodCode: method,
    };
    this.astTree.methods.push(methodOption);
    node.methods.push(uid);
    this.save('新增方法');
    return methodOption;
  }

  /**
   * 根据方法的ID删除方法
   * @param id 要删除的方法的 ID
   */
  public deleteMethodById(id: string) {
    if (!this.astTree.methods) {
      this.astTree.methods = [];
      return false;
    }
    const method = this.getMethodById(id);
    if (method) {
      method.relatedNodeId.forEach(nid => {
        const node = this.getNodeById(nid);
        if (node) this.deleteRelationBtMandN(method, node);
      });
      const idx = this.astTree.methods.indexOf(method);
      if (idx === -1) return false;

      this.astTree.methods.splice(idx, 1);
      this.save('删除了某个方法');
      return true;
    }
    return false;
  }

  public getMethodsList(): MethodType[] {
    const methods = _.get(this.astTree, 'methods', []);
    return methods;
  }

  // 联通多个方法，在渲染引擎中使用闭包完成
  // public chainTwoMethod(firstMethodId: string, secondMethodId: string) {
  //   const firstMethod = this.getMethodById(firstMethodId);
  //   const secondMethod = this.getMethodById(secondMethodId);
  //   if (firstMethod && secondMethod) {
  //     // 如果两个方法都存在，才进行下一步操作
  //     if (!firstMethod.emit) firstMethod.emit = [];

  //     if (!secondMethod.listen) secondMethod.listen = [];

  //     firstMethod.emit.push(secondMethodId);
  //     secondMethod.listen.push(firstMethodId);
  //     this.save('增加方法关联');
  //     return true;
  //   }
  //   return false;
  // }

  // public removeChainBtTwoMethod(firstMethodId: string, secondMethodId: string) {
  //   const firstMethod = this.getMethodById(firstMethodId);
  //   const secondMethod = this.getMethodById(secondMethodId);
  //   if (firstMethod && secondMethod) {
  //     if (firstMethod.emit) {
  //       const idx = firstMethod.emit.findIndex(id => id === secondMethodId);
  //       firstMethod.emit.splice(idx, 1);
  //     }
  //     if (secondMethod.listen) {
  //       const idx = secondMethod.listen.findIndex(id => id === firstMethodId);
  //       secondMethod.listen.splice(idx, 1);
  //     }
  //     this.save('删除方法关联');
  //     return true;
  //   }
  //   return false;
  // }

  public getStateById(id: string) {
    if (!this.astTree.states) this.astTree.states = [];

    const filterState = this.astTree.states.filter(state => {
      return state.id === id;
    });
    if (filterState.length > 0) return filterState[0];

    return null;
  }

  public changeStateById(
    id: string,
    {
      name,
      newStateInitValue,
    }: {
      name: string;
      newStateInitValue: any;
    },
  ) {
    const filterState = this.getStateById(id);
    if (filterState) {
      filterState.initValue = newStateInitValue;
      this.save('修改state');
      return true;
    }
    return false;
  }

  public getRelatedStates(node: AstNodeType) {
    if (node.states)
      return node.states.map(state => {
        return this.getStateById(state);
      });

    return [];
  }

  public getStateList() {
    if (!this.astTree.states) this.astTree.states = [];

    return this.astTree.states;
  }

  public appendState(stateConfig: Omit<StateType, 'id' | 'relatedNodeId'>) {
    if (!this.astTree.states) this.astTree.states = [];
    (stateConfig as StateType).id = uuid();
    (stateConfig as StateType).relatedNodeId = [];
    this.astTree.states.push(stateConfig as StateType);
    this.save(`新增state`);
    return stateConfig as StateType;
  }

  public deleteStateById(id: string) {
    if (!this.astTree.states) {
      this.astTree.states = [];
      this.save('初始化 state 数组');
      return false;
    }
    const state = this.getStateById(id);
    if (state) {
      state.relatedNodeId.forEach(nid => {
        const node = this.getNodeById(nid);
        if (!node) return;

        this.deleteRelationBtSandN(state, node);
      });
      const stateIdx = this.astTree.states.indexOf(state);
      if (stateIdx === -1) return false;

      this.astTree.states.splice(stateIdx, 1);
      this.save('删除了某个state');
      return true;
    }
  }

  // 把 state 和 node 添加关联性
  public relateStateToNode(state: StateType, node: AstNodeType) {
    if (!this.isUsefulNodeType(node)) {
      GGErrorLogger('请检查关联节点是否正确');
      return false;
    }
    state.relatedNodeId = _.uniqWith([...state.relatedNodeId, node.id]);
    node.states = _.uniqWith([...node.states, state.id]);
    this.save('关联state');
    return true;
  }

  // 把 method 和 node 添加关联性
  public relateMethodToNode(method: MethodType, node: AstNodeType) {
    if (!this.isUsefulNodeType(node)) {
      GGErrorLogger('请检查关联节点是否正确');
      return false;
    }
    method.relatedNodeId = _.uniqWith([...method.relatedNodeId, node.id]);
    node.states = _.uniqWith([...node.states, method.id]);
    this.save('关联method');
    return true;
  }

  // 删除 method 和 node 之间的关联
  public deleteRelationBtMandN(method: MethodType, node: AstNodeType) {
    if (!this.isUsefulNodeType(node)) {
      GGErrorLogger('请检查关联节点是否正确');
      return false;
    }
    const methodId = method.id;
    const nodeId = node.id;
    const nodeIdIdx = method.relatedNodeId.indexOf(nodeId);
    const methodIdIdx = node.methods.indexOf(methodId);

    if (nodeIdIdx === -1) GGErrorLogger('方法关联node列表中没有该node ID');
    else method.relatedNodeId.splice(nodeIdIdx, 1);

    if (methodIdIdx === -1) GGErrorLogger('node节点中没有该方法的ID');
    else node.methods.splice(methodIdIdx, 1);

    this.save('删除 method 和 node 的关联');

    return true;
  }

  // 删除 state 和 node 之间的关联
  public deleteRelationBtSandN(state: StateType, node: AstNodeType) {
    if (!this.isUsefulNodeType(node)) {
      GGErrorLogger('请检查关联节点是否正确');
      return false;
    }

    const stateId = state.id;
    const nodeId = node.id;
    const nodeIdIdx = state.relatedNodeId.indexOf(nodeId);
    const stateIdIdx = node.methods.indexOf(stateId);

    if (nodeIdIdx === -1) GGErrorLogger('state 关联node列表中没有该node ID');
    else state.relatedNodeId.splice(nodeIdIdx, 1);

    if (stateIdIdx === -1) GGErrorLogger('node节点中没有该 state 的ID');
    else node.methods.splice(stateIdIdx, 1);

    this.save('删除 state 和 node 的关联');

    return true;
  }

  private clearAllComponentsRelation(node: AstNodeType) {
    const allComponents = this.getComponentNodeList(node);
    if (allComponents) {
      // 清空所有关联
      allComponents.forEach(cmp => {
        cmp.methods.forEach(m => {
          const md = this.getMethodById(m);
          if (md) this.deleteRelationBtMandN(md, node);
        });

        cmp.states.forEach(s => {
          const st = this.getStateById(s);
          if (st) this.deleteRelationBtSandN(st, node);
        });
      });
      this.save('清空了某个 node 的所有关联');
      return true;
    }
    return false;
  }

  public hasParent(node: AstNodeType) {
    return _.has(node, 'parentNode');
  }

  public getParent(node: AstNodeType) {
    const nodeId = _.get(node, 'parentNode');
    if (nodeId) return this.getNodeById(nodeId);

    return null;
  }

  public hasChildren(node: AstNodeType) {
    return _.has(node, 'children') && _.isArray(_.get(node, 'children')) && _.get(node, 'children', []).length > 0;
  }

  public getChildren(node: AstNodeType) {
    return _.get(node, 'children');
  }

  public hasPrevNode(node: AstNodeType) {
    return _.has(node, 'prevNode');
  }

  public getPrevNode(node: AstNodeType) {
    const nodeId = _.get(node, 'prevNode');
    if (nodeId) return this.getNodeById(nodeId);

    return null;
  }

  public hasNextNode(node: AstNodeType) {
    return _.has(node, 'nextNode');
  }

  public getNextNode(node: AstNodeType) {
    const nodeId = _.get(node, 'nextNode');
    if (nodeId) return this.getNodeById(nodeId);

    return null;
  }

  public isFirstLevelNode(node: AstNodeType) {
    return _.get(node, 'isFirstLevelNode');
  }

  public getParentPageId(node: AstNodeType) {
    return _.get(node, 'parentPage');
  }

  public getParentPage(node: AstNodeType) {
    const parentPageId = _.get(node, 'parentPage');
    if (parentPageId) return this.getPageById(parentPageId);

    return null;
  }

  public getPageComponents(node: PageType) {
    return _.get(node, 'components', []);
  }

  public getSelectPageComponents() {
    if (!this.selectPage || !this.astTree.pages || this.astTree.pages.length === 0) return [];

    const page = this.getPageById(this.selectPage);
    if (!page) return [];

    return this.getPageComponents(page);
  }

  public getSelectPage() {
    return this.selectPage;
  }

  public getComponentNodeList(node: AstNodeType) {
    const resultArray: AstNodeType[] = [];
    if (this.isUsefulNodeType(node)) {
      resultArray.push(node);
      if (this.isNodePluggable(node)) this.walkInComponent(node);

      return resultArray;
    }
    return [];
  }

  public getPageNodeList(page: PageType) {
    let resultArray: AstNodeType[] = [];
    if (page && page.components) {
      resultArray = this.walkIn(page);
      return resultArray;
    }
    return [];
  }

  /**
   * 获取所有的 node 列表
   */
  public getNodeList() {
    let resultArray: AstNodeType[] = [];
    if (!this.astTree.pages) return null;

    this.astTree.pages.forEach(page => {
      resultArray = [...resultArray, ...this.walkIn(page)];
    });

    return resultArray;
  }

  public getNodeById(id: string) {
    const resultArray = this.getNodeList();

    if (!resultArray) return null;

    const filterNode = resultArray.filter(cmp => {
      return cmp.id === id;
    });

    if (filterNode.length > 0) return filterNode[0];

    return null;
  }

  public getNodeConfig(node: AstNodeType) {
    return node.config;
  }

  public getNodeConfigById(nodeId: string) {
    const node = this.getNodeById(nodeId);
    if (node) return this.getNodeConfig(node);

    return null;
  }

  public deleteNode(node: AstNodeType) {
    if (this.isFirstLevelNode(node)) {
      // 如果是顶层节点,那么从它的 ParentPage 中删除它
      const parentPage = this.getParentPage(node);
      if (parentPage && parentPage.components) {
        // 获取 node 在其 parentPage 中的 index
        const idx = parentPage.components.indexOf(node);
        if (idx !== -1) {
          // 如果 idx 存在
          this.clearAllComponentsRelation(node);
          parentPage.components.splice(idx, 1);
          this.save('删除了一个 node');
          return true;
        }
        GGErrorLogger('请检查你的 parentPage 中是否有当前节点');
        return false;
      }
      GGErrorLogger('当前节点的 parentPage 不存在');
      return false;
    } else {
      // 如果不是顶层节点，那么需要归还其顶层节点的存储能力
      const parentNode = this.getParent(node);
      if (parentNode && parentNode.children) {
        const idx = parentNode.children.indexOf(node);
        if (idx !== -1) {
          this.clearAllComponentsRelation(node);
          parentNode.layoutCapacity += node.nodeDemandCapacity;
          parentNode.children.splice(idx, 1);
          this.save('删除了一个 node');
          return true;
        }
        GGErrorLogger('请检查你的 parentNode 中是否有当前节点');
        return false;
      }
      GGErrorLogger('当前节点的 parentNode 不存在');
      return false;
    }
  }

  public deleteNodeById(id: string) {
    const node = this.getNodeById(id);
    if (node) return this.deleteNode(node);

    return false;
  }

  /**
   * 判断节点是否可插入
   * @param node
   */
  public isNodePluggable(node: AstNodeType): boolean {
    return node.isLayoutNode;
  }

  public appendNode(target: AstNodeType, node: Omit<AstNodeType, 'id' | 'isFirstLevelNode'>) {
    if (!this.isUsefulNodeType(target) || !this.isUsefulNodeType(node)) return false;

    // 如果还没有children字段，新增children字段
    if (!target.children) target.children = [];

    if (this.isNodePluggable(target) && target.layoutCapacity >= node.nodeDemandCapacity) {
      if (!(node as AstNodeType).id) {
        (node as AstNodeType).id = uuid();
      }
      (node as AstNodeType).isFirstLevelNode = false;
      if (target.children.length > 0) {
        const lastChild = target.children[target.children.length - 1];
        node.prevNode = lastChild.id;
        lastChild.nextNode = (node as AstNodeType).id;
      }
      node.parentNode = target.id;
      target.children.push(node as AstNodeType);
      target.layoutCapacity = target.layoutCapacity - node.nodeDemandCapacity;
      this.save('新增节点');
      return true;
    }
    return false;
  }

  /**
   * 为页面添加节点
   * @param node 节点
   */
  public appendNodeToPage(node: Omit<AstNodeType, 'id' | 'isFirstLevelNode'>) {
    if (!this.astTree.pages) return false;
    if (!this.selectPage) return false;
    const page = this.getPageById(this.selectPage);
    if (page) {
      if (!page.components) page.components = [];

      if (!(node as AstNodeType).id) {
        (node as AstNodeType).id = uuid();
      }
      (node as AstNodeType).isFirstLevelNode = true;
      (node as AstNodeType).parentPage = page.id;
      page.components.push(node as AstNodeType);
    }
    this.save('为页面新增节点');
    return true;
  }

  /**
   * 在某一目标节点后添加节点
   * @param target 目标节点
   * @param node 节点
   */
  public appendNodeAfter(target: AstNodeType, node: Omit<AstNodeType, 'id' | 'isFirstLevelNode'>) {
    if (!(node as AstNodeType).id) {
      (node as AstNodeType).id = uuid();
    }
    if (target.isFirstLevelNode) {
      const parentPage = this.getParentPageId(target);
      if (parentPage) {
        const parentPageNode = this.getPageById(parentPage);
        if (!parentPageNode || !parentPageNode.components) return;

        const idx = parentPageNode.components.indexOf(target);
        if (idx === -1) return false;

        if (target.nextNode) node.nextNode = target.nextNode;

        node.prevNode = target.id;
        node.parentPage = parentPage;
        (node as AstNodeType).isFirstLevelNode = true;
        (target as AstNodeType).nextNode = (node as AstNodeType).id;
        parentPageNode.components.splice(idx + 1, 0, node as AstNodeType);
      }
    } else {
      const parentNode = this.getParent(target);
      if (parentNode) {
        if (parentNode.layoutCapacity < node.nodeDemandCapacity) return false;

        const idx = (parentNode as Required<AstNodeType>).children.indexOf(target);
        if (idx === -1) return false;

        if (target.nextNode) node.nextNode = target.nextNode;

        parentNode.layoutCapacity -= node.nodeDemandCapacity;
        node.prevNode = target.id;
        node.parentNode = parentNode.id;
        (node as AstNodeType).isFirstLevelNode = false;
        (target as AstNodeType).nextNode = (node as AstNodeType).id;
        (parentNode as Required<AstNodeType>).children.splice(idx + 1, 0, node as AstNodeType);
      }
    }
    this.save('在节点后新增了节点');
  }

  /**
   * 在某一目标节点前添加节点
   * @param target 目标节点
   * @param node 节点
   */
  public appendNodeBefore(target: AstNodeType, node: Omit<AstNodeType, 'id' | 'isFirstLevelNode'>) {
    if (!(node as AstNodeType).id) {
      (node as AstNodeType).id = uuid();
    }
    if (target.isFirstLevelNode) {
      const parentPage = this.getParentPageId(target);
      if (parentPage) {
        const parentPageNode = this.getPageById(parentPage);
        if (!parentPageNode || !parentPageNode.components) return;

        const idx = parentPageNode.components.indexOf(target);
        if (idx === -1) return false;

        if (target.prevNode) node.prevNode = target.prevNode;

        node.nextNode = target.id;
        node.parentPage = parentPage;
        (node as AstNodeType).isFirstLevelNode = true;
        (target as AstNodeType).prevNode = (node as AstNodeType).id;
        parentPageNode.components.splice(idx, 0, node as AstNodeType);
      }
    } else {
      const parentNode = this.getParent(target);
      if (parentNode) {
        if (parentNode.layoutCapacity < node.nodeDemandCapacity) return false;

        const idx = (parentNode as Required<AstNodeType>).children.indexOf(target);
        if (idx === -1) return false;

        if (target.prevNode) node.prevNode = target.prevNode;

        parentNode.layoutCapacity -= node.nodeDemandCapacity;
        node.nextNode = target.id;
        node.parentNode = parentNode.id;
        (node as AstNodeType).isFirstLevelNode = false;
        (target as AstNodeType).prevNode = (node as AstNodeType).id;
        (parentNode as Required<AstNodeType>).children.splice(idx, 0, node as AstNodeType);
      }
    }
    this.save('在节点前新增了节点');
  }

  moveNodeToAnotherNode(sourceNodeId: string, aimNodeId: string) {
    const sourceNode = this.getNodeById(sourceNodeId);
    const aimNode = this.getNodeById(aimNodeId);
    if (!sourceNode) {
      throw '';
    }
    if (!aimNode) {
      throw '';
    }
    if (aimNode.isLayoutNode) {
      const clonedSrouceNode = _.cloneDeep(sourceNode);
    }
  }

  // TODO: 增加拷贝方法
  /**
   * 拷贝节点方法，主要用于列表循环和动态的物料渲染
   * @param node 被拷贝的 node
   */
  public copyNode(node: AstNodeType) {
    const clonedNode = _.cloneDeep(node);
    const cmps = this.walkInComponent(clonedNode);
    cmps.forEach(component => {
      component.id = uuid();
      if (component.states && component.states.length > 0) {
        // 拷贝所有的方法引用
        if (component.methods) {
        }

        // 拷贝所有的状态引用
        if (component.states) {
        }
      }
    });
  }

  public compileMethodRelations(method: string): string[] {
    return [];
  }

  public setNodeConfig(node: AstNodeType, config: ConfigType) {
    node.config = config;
    this.save('保存了节点配置');
    return true;
  }

  public setNodeKeyConfig(node: AstNodeType, key: string, config: ConfigValueType) {
    node.config[key] = config;
    this.save(`为节点保存了key为${key}的配置`);
    return true;
  }

  public setNodeDemandCapacity(node: AstNodeType, dc: number) {
    node.nodeDemandCapacity = dc;
    this.save('保存了节点的需求');
    return true;
  }

  /**
   * 罗列所有的 page
   */
  public getPageList() {
    return this.astTree.pages;
  }

  /**
   * 新增页面
   * @param param0
   */
  public createNewPage({ name = '', isIndex = false, path = '' }) {
    if (!this.astTree.pages) this.astTree.pages = [];
    if (isIndex) {
      const hasIndexPage = this.getIndexPage();
      if (hasIndexPage) {
        throw new Error('已经有了首页');
      }
    }
    const page = {
      id: uuid(),
      name,
      isIndex,
      path,
    };
    this.astTree.pages.push(page);
    this.save('新增了页面');
    return page;
  }

  /**
   * 根据ID删除某个页面
   * @param id
   */
  public deletePageById(id: string) {
    let idx: number | null = null;
    if (!this.astTree.pages) {
      GGErrorLogger('不存在Page');
      return false;
    }
    this.astTree.pages.forEach((page, index) => {
      if (page.id === id) idx = index;
    });
    if (_.isFinite(idx)) this.astTree.pages.splice((idx as unknown) as number, 1);

    this.save('根据ID删除了页面');
    return true;
  }

  /**
   * 根据ID获取某个页面
   * @param id
   */
  public getPageById(id: string) {
    if (this.astTree.pages) {
      const filterResult = this.astTree.pages.filter(page => {
        return page.id === id;
      });
      if (filterResult.length > 0) return filterResult[0];
    }
    return null;
  }

  /**
   * 设置所有页面中的首页
   * @param id
   */
  public setIndexPageById(id: string) {
    const haveIndexPage = this.getIndexPage();
    if (haveIndexPage) {
      GGErrorLogger('已经设置首页了哦');
      return false;
    }
    const page = this.getPageById(id);
    if (page) {
      page.isIndex = true;
      this.save('设置页面为首页');
      return true;
    }
    return false;
  }

  public getIndexPage() {
    const pages = this.tree.pages;
    if (!pages) return null;

    const filterPage = pages.filter(page => {
      return page.isIndex === true;
    });
    if (filterPage && filterPage.length > 0) return filterPage[0];

    return null;
  }

  // 切换页面
  public changePage(id: string) {
    this.selectPage = id;
    this.save('切换页面');
    return true;
  }

  public hasSelectPage() {
    if (this.selectPage) return true;
    return false;
  }

  /**
   * 获取历史操作记录
   */
  public getHistorys(): HistoryType[] {
    return this.history;
  }

  /**
   * 根据 ID 获取某次历史记录的消息
   * @param id 历史记录ID
   */
  public getHistoryById(id: string) {
    if (this.history) {
      const filterHistory = this.history.filter(his => {
        return his.id === id;
      });
      if (filterHistory.length > 0) return filterHistory[0];
    }
    return null;
  }

  /**
   * 返回至某一历史记录
   * @param id 历史记录ID
   */
  public goBackToByHistoryId(id: string) {
    const history = this.getHistoryById(id);
    if (history) {
      this.resetAst(history.ast);
      this.astSetter(history.ast);
      return true;
    }
    return false;
  }

  public changeNodeStyle(node: AstNodeType, style: astNodeStyleType) {
    node.style = style;
    this.save('修改样式');
  }

  public getNodeStyle(node: AstNodeType): astNodeStyleType | {} {
    if (node.style) {
      return node.style;
    }
    return {};
  }

  public setNodeName(node: AstNodeType, newName: string) {
    node.name = newName;
    this.save('保存节点名称');
    return;
  }

  /**
   * 打印 AST 树
   */
  public displayAstTree() {
    console.group('AST');
    console.log(this.astTree);
    console.groupEnd();
  }

  public addCustomLayout(customLayout: CustomLayout) {
    if (!this.astTree.customLayout) {
      this.astTree.customLayout = [];
    }
    this.astTree.customLayout.push(customLayout);
    this.save('新增自定义布局');
  }

  public getCustomLayouts() {
    return this.astTree.customLayout;
  }

  public makeLayoutNode(config: Omit<ConstructorParameters<typeof AstNode>[0], 'isLayoutNode'>) {
    (config as AstNodeType).isLayoutNode = true;
    // 布局节点的工厂函数
    return new AstNode(config as AstNodeType);
  }

  public makeFunctionNode(config: Omit<ConstructorParameters<typeof AstNode>[0], 'isLayoutNode' | 'layoutCapacity'>) {
    // 功能节点的工厂函数
    (config as AstNodeType).isLayoutNode = false;
    return new AstNode(config as AstNodeType);
  }

  public makeConfig<T>(node: AstNodeType, k: string, value: ConfigValueType) {
    // 节点 config 的工厂函数
    node.config = {
      ...node.config,
      [k]: value,
    };
    return true;
  }

  public makeValueConfig(value: any) {
    // config 配置静态 value 的工厂函数
    return new StaticConfigItem(value) as StaticConfigValue;
  }

  public makeStateConfig(stateId: string) {
    // config 配置 state 的工厂函数
    return new StateConfigItem(stateId) as StateConfigValue;
  }

  public makeMethodConfig(methodId: string) {
    // config 配置 method 的工厂函数
    return new MethodConfigItem(methodId) as MethodConfigValue;
  }
}

export default AstParser;
