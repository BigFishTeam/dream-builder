import React, { FC, useEffect, useState, useCallback } from 'react';
import { produce } from 'immer';
import Materials, { getMetaInfo } from '../../materials/index';
import './index.scss';
import { BEM } from '../../common/utils/bem';
import { Popover, Button, Modal } from 'antd';
import { useDrag } from 'react-dnd';
import Utils from '../../common/utils/utils';
import dndType from '../../constant/drag';
import _ from 'lodash';
import Icon from '@ant-design/icons';
import LayoutComposer from '../layoutComposer';
import eventManager from '../../eventManager';
import { useGlobalContext } from '../../context/global';
import { CustomLayout } from '../../core/ast';
import { InfoCircleOutlined } from '@ant-design/icons';

const { uuid } = Utils;

const MaterialItem: FC<{ material: ReturnType<typeof getMetaInfo> }> = ({ material }) => {
  const [collectedProps, drag] = useDrag({
    item: {
      type: dndType.MATERIAL,
      materialType: material.type,
      ..._.omit(material, 'type'),
    },
  });

  const renderIcon = useCallback((iconPath: string, iconMode: any) => {
    const maxStyle = { height: '32px', width: '32px' };
    if (iconMode === 'src') {
      return <img style={maxStyle} src={iconPath} />;
    }
    //TODO: 新的图标
    return React.createElement('div', {
      style: maxStyle,
    });
  }, []);

  return (
    <Popover content={material.desc}>
      <div className={BEM('materialTools', 'item')}>
        <div ref={drag}>
          <div className={BEM('materialTools', 'item-icon')}>{renderIcon(material.icon, material?.iconMode)}</div>
          <div className={BEM('materialTools', 'item-type')}>{material.type}</div>
        </div>
      </div>
    </Popover>
  );
};

const CustomLayoutItem: FC<{ customLayout: CustomLayout }> = ({ customLayout }) => {
  const [, ref] = useDrag({
    item: {
      type: dndType.CUSTOMLAYOUT,
      ...customLayout,
    },
  });
  return (
    <div ref={ref} className={BEM('materialTools', 'customLayout-item')}>
      {customLayout.name}
    </div>
  );
};

const MaterialTools: FC = () => {
  const [materials, setMaterials] = useState<ReturnType<typeof getMetaInfo>[]>([]);
  const [showComposer, setShowComposer] = useState<boolean>(false);
  const { ast, astTool } = useGlobalContext();
  const [customLayouts, setCustomLayouts] = useState<CustomLayout[]>([]);

  useEffect(() => {
    const customLayouts = astTool.getCustomLayouts();
    if (customLayouts) {
      setCustomLayouts(customLayouts);
    }
  }, [ast]);

  useEffect(() => {
    for (const materialKey in Materials) {
      const material = Materials[materialKey as keyof typeof Materials];
      setMaterials(materials =>
        produce(materials, draft => {
          draft.push(getMetaInfo(material));
        }),
      );
    }
  }, []);

  return (
    <>
      <div className={BEM('materialTools')}>
        <div className={BEM('materialTools', 'title')}>
          物料集合
          <Popover content={'这里是所有可以使用的物料合集，包括布局物料和功能物料'}>
            <InfoCircleOutlined style={{ marginLeft: 5, marginRight: 5 }} />
          </Popover>
          <Button
            size="small"
            onClick={() => {
              setShowComposer(true);
            }}>
            布局组合器
          </Button>
        </div>
        <div className={BEM('materialTools', 'wrapper')}>
          <div>
            <div className={BEM('materialTools', 'wrapper-container-title')}>布局物料</div>
            <div className={BEM('materialTools', 'wrapper-container')}>
              {materials.map(material => {
                return material.isLayoutNode && <MaterialItem key={uuid()} material={material} />;
              })}
            </div>
          </div>
          <div>
            <div className={BEM('materialTools', 'wrapper-container-title')}>功能物料</div>
            <div className={BEM('materialTools', 'wrapper-container')}>
              {materials.map(material => {
                return !material.isLayoutNode && <MaterialItem key={uuid()} material={material} />;
              })}
            </div>
          </div>
          <div>
            <div className={BEM('materialTools', 'wrapper-container-title')}>自定义布局</div>
            <div className={BEM('materialTools', 'wrapper-container')}>
              {customLayouts.map(customLayout => {
                return <CustomLayoutItem customLayout={customLayout} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={showComposer}
        title={'布局组合器'}
        onCancel={() => {
          setShowComposer(false);
        }}
        onOk={() => {
          eventManager.emit('createCustomLayout');
          setShowComposer(false);
        }}>
        <LayoutComposer />
      </Modal>
    </>
  );
};

export default MaterialTools;
