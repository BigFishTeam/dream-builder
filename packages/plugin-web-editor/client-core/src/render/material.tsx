import React, { Component } from 'react';
import { connect, MapDispatchToProps, Provider } from 'react-redux';
import cn from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import store from './store/renderStore';
import Materials, { getMetaInfo } from '../materials/index';
import AstParser, {
  ConfigType,
  StateConfigValue,
  StaticConfigValue,
  MethodConfigValue,
  CustomLayout,
  AstNodeType,
  astNodeStyleType,
} from '../core/ast';
import { setStateById } from './store/renderAction';
import { isProd } from '../common/utils/prod';
import './mhoc.scss';
import { BEM } from '../common/utils/bem';
import { injectMethod } from './helper';
import { GlobalContext } from '../context/global';
import { DragSource, DropTarget } from 'react-dnd';
import dndTypes from '../constant/drag';
import eventManager from '../eventManager';
import materials from '../materials/index';
import 'animate.css';

type stateType = ReturnType<typeof store.getState>;
const mapStoreStateToMaterial = (state: stateType, stateId: string) => {
  if (!state.stateReducer.states) return {};

  const filterdState = state.stateReducer.states.find(state => state.id === stateId);
  return filterdState;
};

const mapStoreMethodToMaterial = (state: stateType, methodId: string) => {
  const noop = () => {};
  if (!state.methodReducer.methods) return noop;

  const filterdMethod = state.methodReducer.methods.find(method => method.id === methodId);
  return filterdMethod;
};

const mapStaticConfigToMaterial = (config: ConfigType): any => {
  const obj = {} as any;
  Object.keys(config).map(key => {
    switch (config[key].type) {
      case 'static':
        obj[key] = (config[key] as StaticConfigValue).value;
        break;
      default:
        break;
    }
  });
  return obj;
};

const mapConfigToMaterial = (state: stateType, config: ConfigType) => {
  const obj = {} as any;
  Object.keys(config).map(key => {
    switch (config[key].type) {
      case 'static':
        obj[key] = (config[key] as StaticConfigValue).value;
        break;
      case 'state':
        const storeState = mapStoreStateToMaterial(state, (config[key] as StateConfigValue).stateId);
        if (_.has(storeState, 'value')) {
          obj[key] = (storeState as typeof state.stateReducer.states[0]).value;
        } else {
          obj[key] = storeState;
        }
        break;
      case 'method':
        if (!obj.method) {
          obj.method = {};
        }
        obj.method[key] = mapStoreMethodToMaterial(state, (config[key] as MethodConfigValue).methodId);
        break;
    }
  });
  return obj;
};

interface MHOCPropsType {
  config: ConfigType;
  astTool: AstParser;
  materialType: string;
  children?: any;
  id: string;
  method?: {
    [key: string]: {
      method: string;
      id: string;
    };
  };
  changeState?: any;
}

const elementSource = {
  canDrag(props: any) {
    return true;
  },

  beginDrag(props: any, monitor: any, component: any) {
    return { ...props };
  },

  isDragging(props: any, monitor: any, component: any) {
    return monitor.getItem().id === props.id;
  },

  endDrag(props: any, monitor: any, component: any) {
    return true;
  },
};

const materialTarget = {
  canDrop(props: any, monitor: any, isHandled: any) {
    return true;
  },

  hover(props: any, monitor: any, component: any) {},

  drop(props: any, monitor: any, component: any) {
    if (monitor.didDrop()) {
      return;
    }
    const materialConfig = monitor.getItem();
    const itemType = monitor.getItemType();
    switch (itemType) {
      case dndTypes.MATERIAL:
        component.insertMaterial(materialConfig);
        break;
      case dndTypes.CUSTOMLAYOUT:
        component.insertCustomLayoutToLayoutMaterial(materialConfig);
        break;
    }
  },
};

const collect = (connect: any, monitor: any) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
};

const dropCollect = (connect: any, monitor: any) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  };
};

class Material extends Component<
  MHOCPropsType,
  {
    isProd: boolean;
    isLayout: boolean;
    isActive: boolean;
    animateClassesGroup: string[];
    renderProps: {
      [key: string]: any;
    };
  }
> {
  static contextType = GlobalContext;

  constructor(props: any) {
    super(props);
    this.state = {
      isProd: isProd(),
      isLayout: this.isLayout(),
      isActive: false,
      animateClassesGroup: [],
      renderProps: {
        ...this.props,
      },
    };
    eventManager.listen('elementSelect', ({ component }: { component: AstNodeType }) => {
      if (component.id === this.props.id) {
        this.setState({
          isActive: true,
        });
      } else {
        if (this.state.isActive) {
          this.setState({
            isActive: false,
          });
        }
      }
      this.animationRunner();
    });
    eventManager.listen('selectNone', () => {
      this.setState({
        isActive: false,
      });
    });
  }

  static getDerivedStateFromProps(nextProps: MHOCPropsType, prevState: MHOCPropsType) {
    const renderProps: any = {};
    if (nextProps.method) {
      Object.keys(nextProps.method).forEach(k => {
        renderProps[k] = injectMethod(
          nextProps.method
            ? {
                code: nextProps.method[k].method,
                id: nextProps.method[k].id,
              }
            : {
                code: '',
                id: '',
              },
          nextProps.changeState,
        );
      });
    }
    return {
      renderProps: {
        ...nextProps,
        ...mapStaticConfigToMaterial(nextProps.config),
        ...renderProps,
      },
    };
  }

  async insertMaterial(materialConfig: any) {
    const targetNodeId = this.props.id;
    const astTool: AstParser = this.context.astTool;
    const targetNode = astTool.getNodeById(targetNodeId);
    const createProps = (await _.get(Materials, materialConfig.materialType).beforeInstantiate()) as any;
    const createPropsConfig = astTool.makeValueConfig(JSON.stringify(createProps));
    if (targetNode) {
      if (materialConfig.isLayoutNode) {
        const layoutNode = astTool.makeLayoutNode({
          name: '',
          layoutCapacity: materialConfig.layoutCapacity,
          nodeDemandCapacity: materialConfig.nodeDemandCapacity,
          type: materialConfig.materialType,
        });
        astTool.setNodeKeyConfig(layoutNode, 'createProps', createPropsConfig);
        astTool.appendNode(targetNode, layoutNode);
      } else {
        const functionNode = astTool.makeFunctionNode({
          name: '',
          nodeDemandCapacity: materialConfig.nodeDemandCapacity,
          type: materialConfig.materialType,
        });
        astTool.setNodeKeyConfig(functionNode, 'createProps', createPropsConfig);
        astTool.appendNode(targetNode, functionNode);
      }
    }
  }

  insertCustomLayoutToLayoutMaterial(
    conf: {
      type: string;
    } & CustomLayout,
  ) {
    if (this.isLayout()) {
      const astTool: AstParser = this.context.astTool;
      const targetNode = astTool.getNodeById(this.props.id);
      if (targetNode) {
        const { Row, Col } = materials;
        const RowMeta = getMetaInfo(Row);
        const ColMeta = getMetaInfo(Col);
        let tempSpan: any = null;
        const wrapRow = astTool.makeLayoutNode({
          name: '',
          layoutCapacity: RowMeta.layoutCapacity as number,
          nodeDemandCapacity: RowMeta.nodeDemandCapacity as number,
          type: 'Row',
        });
        astTool.appendNode(targetNode, wrapRow);
        conf.layouts.forEach(layout => {
          if (layout.type === 'span') {
            tempSpan = layout;
          } else if (layout.type === 'row') {
            const innerCol = astTool.makeLayoutNode({
              name: '',
              layoutCapacity: ColMeta.layoutCapacity as number,
              nodeDemandCapacity: ColMeta.nodeDemandCapacity as number,
              type: 'Col',
            });
            if (tempSpan) {
              const spanConfig = astTool.makeValueConfig(tempSpan.count);
              astTool.setNodeKeyConfig(innerCol, 'offset', spanConfig);
            }
            astTool.setNodeKeyConfig(innerCol, 'span', astTool.makeValueConfig(layout.count));
            astTool.appendNode(wrapRow, innerCol);
            tempSpan = null;
          }
        });
      }
    }
  }

  isLayout() {
    const layoutArray = new Set();
    layoutArray.add('Row');
    layoutArray.add('Col');
    layoutArray.add('Card');
    return layoutArray.has(this.props.materialType);
  }

  async animationRunner() {
    const { astTool, id } = this.props;
    const node = astTool.getNodeById(id);
    if (node) {
      const style = astTool.getNodeStyle(node);
      if (!_.isEmpty(style)) {
        (style as astNodeStyleType).animations.animates.forEach((animate, idx) => {
          setTimeout(() => {
            this.setState({
              animateClassesGroup: ['animated', animate.name],
            });
          }, idx * 1000);
        });
        setTimeout(() => {
          this.setState({
            animateClassesGroup: [],
          });
        }, ((style as astNodeStyleType).animations.animates.length + 1) * 1000);
      }
    }
  }

  renderStyle() {
    const { astTool, id } = this.props;
    const node = astTool.getNodeById(id);
    if (node) {
      const nodeStyle = astTool.getNodeStyle(node);
      if (nodeStyle && !_.isEmpty(nodeStyle)) {
        const origin = nodeStyle as astNodeStyleType;
        const option = {
          marginTop: origin.margin.top,
          marginBottom: origin.margin.bottom,
          marginLeft: origin.margin.left,
          marginRight: origin.margin.right,
          paddingTop: origin.padding.top,
          paddingBottom: origin.padding.bottom,
          paddingLeft: origin.padding.left,
          paddingRight: origin.padding.right,
          width: origin.size.width,
          height: origin.size.height,
          fontSize: origin.font.fontSize,
          fontFamily: origin.font.fontType,
          background: origin.background.backgroundType === 'color' ? origin.background.rgba : origin.background.url,
        };
        return option;
      }
    }
    return {};
  }

  componentDidMount() {
    this.animationRunner();
  }

  render() {
    const { connectDragSource, connectDropTarget } = this.props as any;
    const { isOver } = this.props as any;
    const renderMaterial = (() => {
      return this.isLayout() ? (
        <div
          style={{
            ...this.renderStyle(),
            border: isOver ? '1px solid green' : '',
            display: 'flex',
            flexDirection: this.state.renderProps.materialType === 'Row' ? 'row' : 'column',
            marginLeft: (this.state.renderProps as any).offset
              ? ((this.state.renderProps as any).offset * 100) / 24 + '%'
              : 0,
            width:
              this.state.renderProps.materialType === 'Row'
                ? '100%'
                : ((this.state.renderProps as any).span * 100) / 24 + '%',
            minHeight: 10,
          }}
          onClick={this.selectElement()}
          className={cn([
            this.state.isProd ? '' : BEM('render', 'hoc'),
            this.state.isActive ? BEM('render', 'hoc', 'active') : '',
            ...this.state.animateClassesGroup,
          ])}>
          {React.createElement(_.get(Materials, this.props.materialType), {
            ...this.state.renderProps,
          })}
        </div>
      ) : (
        <div
          style={{
            border: isOver ? '1px solid green' : '',
            ...this.renderStyle(),
          }}
          onClick={this.selectElement()}
          className={cn([
            this.state.isProd ? '' : BEM('render', 'hoc'),
            this.state.isActive ? BEM('render', 'hoc', 'active') : '',
            ...this.state.animateClassesGroup,
          ])}>
          {React.createElement(_.get(Materials, this.props.materialType), {
            ...this.state.renderProps,
          })}
        </div>
      );
    })();
    return _.flow(connectDropTarget, connectDragSource)(renderMaterial) as any;
  }

  private selectElement(): ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined {
    return e => {
      e?.stopPropagation();
      const component = (this.context.astTool as AstParser).getNodeById(this.props.id);
      if (component) {
        eventManager.emit('elementSelect', { component });
      }
    };
  }
}

const mapStateToProps = (state: stateType, ownProps: { config: ConfigType }) => {
  return mapConfigToMaterial(state, ownProps.config);
};

const mapDispatchToProps = (dispatch: typeof store.dispatch, ownProps: { config: ConfigType }) => {
  return {
    changeState: (id: string, value: any) => {
      dispatch(
        setStateById({
          id,
          value,
        }),
      );
    },
  };
};

export default _.flow(
  DropTarget([dndTypes.MATERIAL, dndTypes.CUSTOMLAYOUT], materialTarget as any, dropCollect),
  DragSource(dndTypes.ELEMENT, elementSource as any, collect),
  connect(mapStateToProps, mapDispatchToProps),
)(Material);
