import React, { useReducer, useCallback, useState, useEffect } from 'react';
import produce from 'immer';
import { Collapse, Row, Col, Input, Select, Button, Card, Modal } from 'antd';
import { SketchPicker } from 'react-color';
import animations from '../../../../constant/animates.json';
import { useConfigerContext } from '../../context';
import { useGlobalContext } from '../../../../context/global';
import { astNodeStyleType } from '../../../../core/ast';
import _ from 'lodash';
const { Panel } = Collapse;
const { Option } = Select;

export type directionStateType = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type directionActionType =
  | {
      type: 'changeTop';
      data: {
        top: number;
      };
    }
  | {
      type: 'changeBottom';
      data: {
        bottom: number;
      };
    }
  | {
      type: 'changeLeft';
      data: {
        left: number;
      };
    }
  | {
      type: 'changeRight';
      data: {
        right: number;
      };
    }
  | {
      type: 'reset';
      data: directionStateType;
    };
export type fontActionType =
  | {
      type: 'changeFontType';
      data: {
        fontType: string;
      };
    }
  | {
      type: 'changeFontSize';
      data: {
        fontSize: number;
      };
    }
  | {
      type: 'reset';
      data: fontStateType;
    };

export type fontStateType = {
  fontType: string;
  fontSize: number;
};

export type backgroundStateType =
  | {
      backgroundType: 'image';
      url: string;
    }
  | {
      backgroundType: 'color';
      rgba: string;
    };

export type backgroundActionType =
  | {
      type: 'changeBackgroundType';
      data: {
        backgroundType: 'image' | 'color';
      };
    }
  | {
      type: 'changeBackgroundUrl';
      data: {
        url: string;
      };
    }
  | {
      type: 'changeBackgoundColor';
      data: {
        rgba: string;
      };
    }
  | {
      type: 'reset';
      data: any;
    };

export type animateStateType = {
  animates: {
    name: string;
  }[];
};

type animateActionType =
  | {
      type: 'addAnimate';
      data: {
        name: string;
      };
    }
  | {
      type: 'deleteAnimate';
      data: {
        idx: number;
      };
    }
  | {
      type: 'reset';
      data: animateStateType;
    };
export type sizeStateType = {
  width: string;
  height: string;
};

type sizeActionType =
  | {
      type: 'changeWidth';
      data: {
        width: string;
      };
    }
  | {
      type: 'changeHeight';
      data: {
        height: string;
      };
    }
  | {
      type: 'reset';
      data: sizeStateType;
    };

const sizeReducer = (state: sizeStateType, action: sizeActionType) =>
  produce(state, draft => {
    switch (action.type) {
      case 'changeWidth':
        draft.width = action.data.width;
        break;
      case 'changeHeight':
        draft.height = action.data.height;
        break;
      case 'reset':
        draft.height = action.data.height;
        draft.width = action.data.width;
        break;
      default:
        return state;
    }
  });
const fontReducer = (state: fontStateType, action: fontActionType) =>
  produce(state, draft => {
    switch (action.type) {
      case 'changeFontSize':
        draft.fontSize = action.data.fontSize;
        break;
      case 'changeFontType':
        draft.fontType = action.data.fontType;
        break;
      case 'reset':
        draft.fontType = action.data.fontType;
        draft.fontSize = action.data.fontSize;
        break;
      default:
        return state;
    }
  });
const directionReducer = (state: directionStateType, action: directionActionType) =>
  produce(state, draft => {
    switch (action.type) {
      case 'changeBottom':
        draft.bottom = action.data.bottom;
        break;
      case 'changeLeft':
        draft.left = action.data.left;
        break;
      case 'changeRight':
        draft.right = action.data.right;
        break;
      case 'changeTop':
        draft.top = action.data.top;
        break;
      case 'reset':
        draft.bottom = action.data.bottom;
        draft.top = action.data.top;
        draft.left = action.data.left;
        draft.right = action.data.right;
        break;
      default:
        return state;
    }
  });
const backgroundReducer = (state: backgroundStateType, action: backgroundActionType) =>
  produce(state, draft => {
    switch (action.type) {
      case 'changeBackgoundColor':
        if ((state as any).backgroundType === 'color') {
          (draft as any).rgba = action.data.rgba;
        }
        break;
      case 'changeBackgroundType':
        (draft as any).backgroundType = action.data.backgroundType;
        break;
      case 'changeBackgroundUrl':
        if ((state as any).backgroundType === 'image') {
          (draft as any).url = action.data.url;
        }
        break;
      case 'reset':
        draft.backgroundType = action.data.backgroundType;
        if (draft.backgroundType === 'color') {
          draft.rgba = action.data.rgba;
        } else {
          draft.url = action.data.url;
        }
        break;
      default:
        return state;
    }
  });
const animateReducer = (state: animateStateType, action: animateActionType) =>
  produce(state, draft => {
    switch (action.type) {
      case 'addAnimate':
        draft.animates.push({
          name: action.data.name,
        });
        break;
      case 'deleteAnimate':
        draft.animates.splice(action.data.idx, 1);
        break;
      case 'reset':
        draft.animates = action.data.animates;
        break;
      default:
        return state;
    }
  });

const StyleEditor: React.FC = () => {
  const { selectElementId } = useConfigerContext();
  const { astTool } = useGlobalContext();
  const [animationModalVisible, setAnimationModalVisible] = useState<boolean>(false);
  const initSize = {
    height: '100%',
    width: '100%',
  };
  const [size, dispatchSize] = useReducer<typeof sizeReducer>(sizeReducer, initSize);

  const initDirection = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  const initFont = {
    fontType: '',
    fontSize: 14,
  };

  const initBackground = {
    backgroundType: 'color',
    rgba: '(255, 255, 255, 0)',
  };

  const initAnimateType = {
    animates: [],
  };

  const [margin, dispatchMargin] = useReducer<typeof directionReducer>(directionReducer, initDirection);

  const [padding, dispatchPadding] = useReducer<typeof directionReducer>(directionReducer, initDirection);

  const [font, dispatchFont] = useReducer<typeof fontReducer>(fontReducer, initFont);

  const [background, dispatchBackground] = useReducer<typeof backgroundReducer>(
    backgroundReducer,
    initBackground as any,
  );

  const [animateType, dispatchAnimateType] = useReducer<typeof animateReducer>(animateReducer, initAnimateType);

  const composeAllStyle = useCallback(() => {
    return {
      size,
      margin,
      padding,
      font,
      background,
      animations: animateType,
    };
  }, [size, margin, padding, font, background, animateType]);

  const reset = () => {
    dispatchAnimateType({
      type: 'reset',
      data: _.cloneDeep(initAnimateType),
    });
    dispatchBackground({
      type: 'reset',
      data: _.cloneDeep(initBackground),
    });
    dispatchSize({
      type: 'reset',
      data: _.cloneDeep(initSize),
    });
    dispatchMargin({
      type: 'reset',
      data: _.cloneDeep(initDirection),
    });
    dispatchPadding({
      type: 'reset',
      data: _.cloneDeep(initDirection),
    });
    dispatchFont({
      type: 'reset',
      data: _.cloneDeep(initFont),
    });
  };

  useEffect(() => {
    if (selectElementId) {
      const node = astTool.getNodeById(selectElementId);
      if (node) {
        const nodeStyle = astTool.getNodeStyle(node);
        if (!_.isEmpty(nodeStyle)) {
          const { background, size, margin, font, padding, animations } = nodeStyle as astNodeStyleType;
          dispatchAnimateType({
            type: 'reset',
            data: animations,
          });
          dispatchBackground({
            type: 'reset',
            data: background,
          });
          dispatchSize({
            type: 'reset',
            data: size,
          });
          dispatchMargin({
            type: 'reset',
            data: margin,
          });
          dispatchPadding({
            type: 'reset',
            data: padding,
          });
          dispatchFont({
            type: 'reset',
            data: font,
          });
        }
      }
    }
    return () => {
      reset();
    };
  }, [selectElementId]);

  useEffect(() => {
    if (selectElementId) {
      const node = astTool.getNodeById(selectElementId);
      if (node) {
        astTool.changeNodeStyle(node, composeAllStyle());
      }
    }
  }, [size, margin, padding, font, background, animateType, composeAllStyle, selectElementId]);

  const renderFontSizeOptions = (() => {
    const optionArray: any = [];
    for (let i = 1; i <= 52; i++) {
      optionArray.push(<Option value={i}>{i}</Option>);
    }
    return optionArray;
  })();

  return (
    <>
      <Collapse bordered={false}>
        <Panel header="尺寸" key="1">
          <Row>
            <Col span={8}>宽</Col>
            <Col span={16}>
              <Input
                value={size.width}
                onChange={e => {
                  dispatchSize({
                    type: 'changeWidth',
                    data: {
                      width: e.target.value,
                    },
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>高</Col>
            <Col span={16}>
              <Input
                value={size.height}
                onChange={e => {
                  dispatchSize({
                    type: 'changeHeight',
                    data: {
                      height: e.target.value,
                    },
                  });
                }}
              />
            </Col>
          </Row>
        </Panel>
        <Panel header="外边距" key="2">
          <Row>
            <Row>
              <Col span={8}>左边距</Col>
              <Col span={16}>
                <Input
                  value={margin.left}
                  onChange={e => {
                    dispatchMargin({
                      type: 'changeLeft',
                      data: {
                        left: e.target.value as any,
                      },
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8}>上边距</Col>
              <Col span={16}>
                <Input
                  value={margin.top}
                  onChange={e => {
                    dispatchMargin({
                      type: 'changeTop',
                      data: {
                        top: e.target.value as any,
                      },
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8}>右边距</Col>
              <Col span={16}>
                <Input
                  value={margin.right}
                  onChange={e => {
                    dispatchMargin({
                      type: 'changeRight',
                      data: {
                        right: e.target.value as any,
                      },
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8}>下边距</Col>
              <Col span={16}>
                <Input
                  value={margin.bottom}
                  onChange={e => {
                    dispatchMargin({
                      type: 'changeBottom',
                      data: {
                        bottom: e.target.value as any,
                      },
                    });
                  }}
                />
              </Col>
            </Row>
          </Row>
        </Panel>
        <Panel header="内边距" key="3">
          <Row>
            <Row>
              <Col span={8}>左边距</Col>
              <Col span={16}>
                <Input
                  value={padding.left}
                  onChange={e => {
                    dispatchPadding({
                      type: 'changeLeft',
                      data: {
                        left: e.target.value as any,
                      },
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8}>上边距</Col>
              <Col span={16}>
                <Input
                  value={padding.top}
                  onChange={e => {
                    dispatchPadding({
                      type: 'changeTop',
                      data: {
                        top: e.target.value as any,
                      },
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8}>右边距</Col>
              <Col span={16}>
                <Input
                  value={padding.right}
                  onChange={e => {
                    dispatchPadding({
                      type: 'changeRight',
                      data: {
                        right: e.target.value as any,
                      },
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8}>下边距</Col>
              <Col span={16}>
                <Input
                  value={padding.bottom}
                  onChange={e => {
                    dispatchPadding({
                      type: 'changeBottom',
                      data: {
                        bottom: e.target.value as any,
                      },
                    });
                  }}
                />
              </Col>
            </Row>
          </Row>
        </Panel>

        <Panel header="字体" key="4">
          <Row>
            <Row>
              <Col span={8}>字体类型</Col>
              <Col span={16}>
                <Select
                  defaultValue={'黑体'}
                  onChange={(value: any) => {
                    dispatchFont({
                      type: 'changeFontType',
                      data: {
                        fontType: value,
                      },
                    });
                  }}>
                  <Option value={'黑体'}>黑体</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={8}>字体大小</Col>
              <Col span={16}>
                <Select
                  defaultValue={14}
                  onChange={(value: any) => {
                    dispatchFont({
                      type: 'changeFontSize',
                      data: {
                        fontSize: value,
                      },
                    });
                  }}>
                  {renderFontSizeOptions}
                </Select>
              </Col>
            </Row>
          </Row>
        </Panel>
        <Panel header="背景" key="5">
          <Row>
            <Row>
              <Col span={8}>背景类型</Col>
              <Col span={16}>
                <Select
                  defaultValue={'color'}
                  onChange={(value: any) => {
                    dispatchBackground({
                      type: 'changeBackgroundType',
                      data: {
                        backgroundType: value as any,
                      },
                    });
                  }}>
                  <Option value={'image'}>图片</Option>
                  <Option value={'color'}>颜色</Option>
                </Select>
              </Col>
            </Row>
            {background.backgroundType === 'image' && (
              <Row>
                <Row>背景图片地址</Row>
                <Row>
                  <Input
                    value={background.url}
                    onChange={e => {
                      dispatchBackground({
                        type: 'changeBackgroundUrl',
                        data: {
                          url: e.target.value as any,
                        },
                      });
                    }}
                  />
                </Row>
              </Row>
            )}
            {background.backgroundType === 'color' && (
              <Row>
                <Row>背景颜色</Row>
                <Row>
                  <SketchPicker
                    color={background.rgba}
                    onChange={color => {
                      dispatchBackground({
                        type: 'changeBackgoundColor',
                        data: {
                          rgba: `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`,
                        },
                      });
                    }}
                    width={'200px'}
                  />
                </Row>
              </Row>
            )}
          </Row>
        </Panel>
        <Panel header="动画" key="6">
          <Row>
            <Row>
              <Row>
                <Button
                  onClick={() => {
                    setAnimationModalVisible(true);
                  }}>
                  添加动画
                </Button>
              </Row>
              <Modal
                visible={animationModalVisible}
                onCancel={() => {
                  setAnimationModalVisible(false);
                }}
                footer={null}>
                {animations.animations.map(name => {
                  return (
                    <Button
                      onClick={() => {
                        dispatchAnimateType({
                          type: 'addAnimate',
                          data: {
                            name: name,
                          },
                        });
                        setAnimationModalVisible(false);
                      }}>
                      {name}
                    </Button>
                  );
                })}
              </Modal>
            </Row>
            <Row>
              <Row>已添加的动画列表</Row>
              <Card>
                {animateType.animates.map((animate, idx) => {
                  return (
                    <Row>
                      {idx + 1}: {animate.name}
                      <Button
                        style={{
                          marginLeft: 5,
                        }}
                        onClick={() => {
                          dispatchAnimateType({
                            type: 'deleteAnimate',
                            data: {
                              idx,
                            },
                          });
                        }}>
                        删除
                      </Button>
                    </Row>
                  );
                })}
              </Card>
            </Row>
          </Row>
        </Panel>
      </Collapse>
    </>
  );
};

export default StyleEditor;
