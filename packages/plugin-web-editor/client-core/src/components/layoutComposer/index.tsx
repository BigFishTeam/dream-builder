import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import _ from 'lodash';
import './index.scss';
import { BEM } from '../../common/utils/bem';
import Utils from '../../common/utils/utils';
import { Button, Radio, Tag, Input } from 'antd';
import eventManager from '../../eventManager';
import { useGlobalContext } from '../../context/global';

const { uuid } = Utils;

type LayoutConfigType = {
  isUsed: boolean;
};

type ComposedGroupType = {
  start: number;
  end: number;
  type: string;
  id: string;
};

const initLayoutConfig = () => {
  const configArray: LayoutConfigType[] = [];
  for (let i = 0; i < 24; i++) {
    configArray.push({
      isUsed: false,
    });
  }
  return configArray;
};

const LayoutComposer = () => {
  const start = useRef<number | null>(null);
  const end = useRef<number | null>(null);
  const layoutNameRef = useRef<string>('');
  const composedGroupRef = useRef<ComposedGroupType[]>([]);

  const [layoutGroup, setLayoutGroup] = useState<LayoutConfigType[]>(initLayoutConfig());
  const [selectedLayoutMode, setSelectedLayoutMode] = useState<string>('row');
  const [composedGroup, setComposetGroup] = useState<ComposedGroupType[] | null>(null);
  const [layoutName, setLayoutName] = useState<string>('');

  const { astTool } = useGlobalContext();

  useEffect(() => {
    eventManager.listen('createCustomLayout', () => {
      astTool.addCustomLayout({
        name: layoutNameRef.current,
        layouts: composedGroupRef.current.map(layout => {
          return {
            type: layout.type as any,
            count: layout.end - layout.start + 1,
          };
        }),
      });
    });
  }, []);

  useEffect(() => {
    layoutNameRef.current = layoutName;
    if (composedGroup) {
      composedGroupRef.current = composedGroup;
    }
  }, [layoutName, composedGroup]);

  const pushToComposedGroup = ({ start, end, type }: Omit<ComposedGroupType, 'id'>) => {
    if (_.isFinite(start) && _.isFinite(end)) {
      setComposetGroup(composedGroup => {
        const newComposedGroup = {
          start,
          end,
          type,
          id: uuid(),
        };
        if (composedGroup) {
          composedGroup.push(newComposedGroup);
          return Array.from(composedGroup);
        }
        return [newComposedGroup];
      });
    }
  };

  const removeFromComposedGroup = (id: string) => {
    const clonedComposedGroup = _.cloneDeep(composedGroup);
    const cpItemIdx = clonedComposedGroup?.findIndex(cp => cp.id === id);
    if (clonedComposedGroup && !_.isUndefined(cpItemIdx)) {
      const cpItem = clonedComposedGroup[cpItemIdx];
      const group = _.cloneDeep(layoutGroup);
      for (let i = cpItem.start; i <= cpItem.end; i++) {
        group[i].isUsed = false;
      }
      setLayoutGroup(group);
      clonedComposedGroup?.splice(cpItemIdx, 1);
      setComposetGroup(Array.from(clonedComposedGroup));
    }
  };

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      start.current = parseInt((event.target as HTMLDivElement).dataset.index as string);
    },
    [layoutGroup, selectedLayoutMode],
  );

  const checkUsedStage = (start: number, end: number) => {
    for (let i: any = start; i <= end; i++) {
      if (layoutGroup[i].isUsed) {
        eventManager.error('不能选取已经选择的部分');
        return false;
      }
    }
    return true;
  };

  const handleMouseUp = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      end.current = parseInt((event.target as HTMLDivElement).dataset.index as string);
      if (!_.isNull(start.current) && !_.isNull(end.current)) {
        const group = _.cloneDeep(layoutGroup);
        if (end.current >= (start.current as any)) {
          if (checkUsedStage(start.current as any, end.current as any)) {
            for (let i = start.current as any; (i <= end.current) as any; i++) {
              group[i].isUsed = true;
            }
            pushToComposedGroup({
              start: start.current as any,
              end: end.current as any,
              type: selectedLayoutMode,
            });
            setLayoutGroup(group);
          }
        } else {
          if (checkUsedStage(end.current as any, start.current as any)) {
            for (let i = end.current as any; i <= (start.current as any); i++) {
              group[i].isUsed = true;
            }
            pushToComposedGroup({
              start: end.current as any,
              end: start.current as any,
              type: selectedLayoutMode,
            });
            setLayoutGroup(group);
          }
        }
      }
      start.current = null;
      end.current = null;
    },
    [layoutGroup, selectedLayoutMode],
  );

  return (
    <div className={BEM('layoutComposer', 'wrapper')}>
      <div
        style={{
          marginBottom: '12px',
        }}>
        <span>布局名称</span>
        <Input
          value={layoutName}
          onChange={e => {
            setLayoutName(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          marginBottom: '12px',
        }}>
        <span>选择要组合的项目: </span>
        <Radio.Group
          value={selectedLayoutMode}
          onChange={e => {
            setSelectedLayoutMode(e.target.value);
          }}>
          <Radio.Button value={'row'}>列</Radio.Button>
          <Radio.Button value={'span'}>间隔</Radio.Button>
        </Radio.Group>
      </div>
      <div
        onMouseDownCapture={e => handleMouseDown(e)}
        onMouseUpCapture={e => handleMouseUp(e)}
        className={BEM('layoutComposer', 'composer')}>
        {layoutGroup.map((layoutConfig, index) => {
          return (
            <div
              key={uuid()}
              data-index={index}
              style={{
                border: '1px solid black',
                backgroundColor: layoutConfig.isUsed ? 'black' : 'white',
                height: '20px',
                width: '20px',
                marginRight: '3px',
              }}
            />
          );
        })}
      </div>
      <div>
        {composedGroup?.map(cp => {
          return (
            <div
              key={uuid()}
              style={{
                marginTop: '10px',
                marginBottom: '10px',
              }}>
              <Tag
                closable
                onClose={() => {
                  removeFromComposedGroup(cp.id);
                }}>
                {cp.start} - {cp.end} | 类型: {cp.type === 'row' ? '列' : '间距'}
              </Tag>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LayoutComposer;
