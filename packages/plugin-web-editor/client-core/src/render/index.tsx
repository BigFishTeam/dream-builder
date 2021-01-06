import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import ErrorBoundary from '../components/errorBoundary/errorBoundary';
import 'reflect-metadata';
import { BEM } from '../common/utils/bem';
import dndTypes from '../constant/drag';
import { useDrop } from 'react-dnd';
import 'antd/dist/antd.css';
import { useGlobalContext } from '../context/global';
import { Provider } from 'react-redux';
import store from './store/renderStore';
import AstParser, { AstNodeType, CustomLayout } from '../core/ast';
import Material from './material';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './index.scss';
import eventManager from '../eventManager';
import materials, { getMetaInfo, MaterialInfoType } from '../materials';
import { addMethod, addState } from './store/renderAction';

type MaterialDropItem = {
  type: string;
  materialType: string;
  config: {
    name: string;
  }[];
  nodeDemandCapacity: number;
  layoutCapacity: number;
  isLayoutNode: boolean;
  desc: string;
  icon: string;
};

const Render: React.FC = function() {
  const [, setUpdater] = useState(0);
  const [hasSelectPage, setHasSelectPage] = useState<boolean>(false);
  const { ast, astTool, eBus } = useGlobalContext();
  const RenderByAstTree = useCallback(() => {
    setHasSelectPage(astTool.hasSelectPage());
  }, [astTool, ast]);

  const convertComposeLayoutToNestedNodes = (
    conf: {
      type: string;
    } & CustomLayout,
    astTool: AstParser,
  ) => {
    // 转译组合布局到真实的node列表
    const { Row, Col } = materials;
    const selectedPageId = astTool.getSelectPage();
    if (selectedPageId) {
      const selectedPage = astTool.getPageById(selectedPageId);
      if (selectedPage) {
        const RowMeta = getMetaInfo(Row);
        const ColMeta = getMetaInfo(Col);
        let tempSpan: any = null;
        const wrapRow = astTool.makeLayoutNode({
          name: '',
          layoutCapacity: RowMeta.layoutCapacity as number,
          nodeDemandCapacity: RowMeta.nodeDemandCapacity as number,
          type: 'Row',
        });
        astTool.appendNodeToPage(wrapRow);
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
  };

  const forceUpdate = useCallback(() => setUpdater(updater => updater + 1), []);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [dndTypes.MATERIAL, dndTypes.CUSTOMLAYOUT],
    drop: (item: MaterialDropItem, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      const itemType = monitor.getItemType();

      const materialHandler = () => {
        if (!hasSelectPage) {
          notification.error({
            message: '还没有选择一个添加页面哦',
          });
        } else {
          const selectedPageId = astTool.getSelectPage();
          if (selectedPageId) {
            const selectedPage = astTool.getPageById(selectedPageId);
            if (selectedPage) {
              if (item.isLayoutNode) {
                astTool.appendNodeToPage(
                  astTool.makeLayoutNode({
                    name: '',
                    layoutCapacity: item.layoutCapacity,
                    nodeDemandCapacity: item.nodeDemandCapacity,
                    type: item.materialType,
                  }),
                );
              } else {
                eventManager.error('功能物料必须位于布局物料中');
              }
            }
          }
        }
      };

      const customLayoutHandler = () => {
        const layoutConf = (item as any) as {
          type: string;
        } & CustomLayout;
        convertComposeLayoutToNestedNodes(layoutConf, astTool);
      };

      switch (itemType) {
        case dndTypes.CUSTOMLAYOUT:
          customLayoutHandler();
          break;
        case dndTypes.MATERIAL:
          materialHandler();
          break;
        default:
          break;
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    RenderByAstTree();
  }, [ast]);

  useEffect(() => {
    notification.open({
      message: '渲染引擎加载完成',
      duration: 2,
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
    eBus.listen('pageChange', page => {
      forceUpdate();
    });
  }, []);

  const renderComponent = (father: AstNodeType): any => {
    if (father.children)
      return father.children.map(cmp => {
        let child = null;
        if (astTool.hasChildren(cmp)) {
          child = renderComponent(cmp);
        }

        return (
          <Material id={cmp.id} astTool={astTool} config={cmp.config} materialType={cmp.type}>
            {child}
          </Material>
        );
      });

    return null;
  };

  const renderPage = () => {
    let cmps: AstNodeType[] = [];
    if (astTool.hasSelectPage()) cmps = astTool.getSelectPageComponents();
    else {
      const indexPage = astTool.getIndexPage();
      if (indexPage) cmps = astTool.getPageComponents(indexPage);

      const pages = astTool.getPageList();
      if (pages && pages.length > 0) cmps = astTool.getPageComponents(pages[0]);
    }
    const methodsList = astTool.getMethodsList();
    const statesList = astTool.getStateList();
    if (methodsList) {
      methodsList.forEach(method => {
        store.dispatch(
          addMethod({
            id: method.id,
            name: method.name,
            method: method.methodCode,
          }),
        );
      });
    }
    if (statesList) {
      statesList.forEach(state => {
        store.dispatch(
          addState({
            id: state.id,
            name: state.name,
            initValue: eval(state.initValue),
          }),
        );
      });
    }

    return cmps.map(cmp => {
      return (
        <Material id={cmp.id} astTool={astTool} config={cmp.config} materialType={cmp.type}>
          {renderComponent(cmp)}
        </Material>
      );
    });
  };

  return (
    <Provider store={store}>
      <div
        ref={drop}
        className={BEM('render', 'wrapper')}
        onClick={() => {
          eBus.emit('selectNone');
        }}>
        <ErrorBoundary>
          {!hasSelectPage && (
            <div className={BEM('render', 'info')}>
              <div>还没有选择页面哦</div>
              <div>如果还没有添加页面，试着添加一个页面</div>
            </div>
          )}
          <div>{renderPage()}</div>
        </ErrorBoundary>
      </div>
    </Provider>
  );
};

export default Render;
