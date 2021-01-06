import React, { useState, useEffect, useRef } from 'react';
import { Select, Radio, Input, Button, Drawer, Card, Row, Col, Modal } from 'antd';
import { useGlobalContext } from '../../../../context/global';
import AceEditor from 'react-ace';
import _ from 'lodash';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';
import { useConfigerContext } from '../../context';

const { Option } = Select;

type onOkType = (type: string, value: any) => any;

const StaticDataViewer: React.FC<{
  onOk: onOkType;
}> = ({ onOk }) => {
  const [staticValue, setStaticValue] = useState<string>('');
  const { setSelectPropertyConfig } = useConfigerContext();
  const appendStaticConfigToElement = () => {
    onOk('static', staticValue);
  };
  return (
    <div
      style={{
        marginTop: '14px',
      }}>
      <div>静态数据</div>
      <div>
        <Input
          value={staticValue}
          onChange={e => {
            setStaticValue(e.target.value);
          }}
        />
      </div>
      <div
        style={{
          marginTop: '14px',
        }}>
        <Button onClick={appendStaticConfigToElement}>确定</Button>
      </div>
    </div>
  );
};

const StateDataViewer: React.FC<{
  onOk: onOkType;
}> = ({ onOk }) => {
  const { astTool } = useGlobalContext();
  const [stateConfigerVisible, setStateConfigerVisible] = useState<boolean>(false);
  const [states, setStates] = useState(astTool.getStateList());
  const [stateName, setStateName] = useState<string>('');
  const [stateInitValue, setStateInitValue] = useState<any>();

  const configerWorkMode = useRef<'add' | 'config'>('add');
  const selectStateId = useRef<string>('');

  const createState = () => {
    if (configerWorkMode.current === 'add') {
      astTool.appendState({
        name: stateName,
        initValue: stateInitValue,
      });
      setStateConfigerVisible(false);
      setStateName('');
      setStateInitValue('');
    } else {
      const state = astTool.getStateById(selectStateId.current);
      if (state) {
        astTool.changeStateById(selectStateId.current, {
          name: stateName,
          newStateInitValue: stateInitValue,
        });
      }
      setStateConfigerVisible(false);
      setStateName('');
      setStateInitValue('');
    }
  };

  useEffect(() => {
    if (configerWorkMode.current === 'config') {
      const state = astTool.getStateById(selectStateId.current);
      if (state) {
        setStateName(state.name);
        setStateInitValue(state.initValue);
      }
    }
  }, [stateConfigerVisible]);

  return (
    <div>
      <div>状态</div>
      <div>
        <div>
          {states.map(state => {
            return (
              <Card>
                <div>属性ID: {state.id}</div>
                <div>属性名: {state.name}</div>
                <div>属性初始值: {state.initValue}</div>
                <div>
                  <Button
                    onClick={() => {
                      onOk('state', state.id);
                    }}>
                    选取属性
                  </Button>
                  <Button
                    onClick={() => {
                      setStateConfigerVisible(true);
                      configerWorkMode.current = 'config';
                      selectStateId.current = state.id;
                    }}>
                    修改
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
        <div>
          <Button
            onClick={() => {
              setStateConfigerVisible(true);
              configerWorkMode.current = 'add';
            }}>
            添加状态
          </Button>
        </div>
      </div>
      <Drawer visible={stateConfigerVisible} onClose={() => setStateConfigerVisible(false)} title="状态编辑">
        <div>
          <div>
            <span>状态名</span>
          </div>
          <div>
            <Input value={stateName} onChange={e => setStateName(e.target.value)} />
          </div>
        </div>
        <div>
          <div>
            <span>初始状态值</span>
          </div>
          <div>
            <AceEditor
              value={stateInitValue}
              mode={'javascript'}
              theme={'monokai'}
              onChange={value => setStateInitValue(value)}
            />
          </div>
        </div>
        <div>
          <div>
            <Button onClick={createState}>确认</Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

const MethodDataViewer: React.FC<{
  onOk: onOkType;
}> = ({ onOk }) => {
  const { astTool, ast } = useGlobalContext();
  const { selectElementId } = useConfigerContext();
  const [methodConfigerVisible, setMethodConfigerVisible] = useState<boolean>(false);
  const [methodName, setMethodName] = useState<string>('');
  const [methodCode, setMethodCode] = useState<string>('');
  const [stateModalVisible, setStateModalVisible] = useState<boolean>(false);
  const [stateChangerModalVisible, setStateChangerModalVisible] = useState<boolean>(false);
  const [methodModalVisible, setMethodModalVisible] = useState<boolean>(false);
  const [ajaxModalVisible, setAjaxModalVisible] = useState<boolean>(false);

  const [methods, setMethods] = useState(astTool.getMethodsList());
  const [states, setStates] = useState(astTool.getStateList());
  const cursorPosition = useRef<{
    doc: string[];
    column: number;
    row: number;
  }>({
    doc: [''],
    column: 0,
    row: 0,
  });
  useEffect(() => {
    setMethods(astTool.getMethodsList());
    setStates(astTool.getStateList());
  }, [ast]);

  const StateModal: React.FC<Partial<{
    onOk: any;
    onCancel: any;
    visible: boolean;
  }>> = ({ onOk, visible, onCancel }) => {
    return (
      <Modal visible={visible} onCancel={onCancel}>
        {states.map(state => {
          return (
            <Card>
              <div>name: {state.name}</div>
              <div>initValue: {state.initValue}</div>
              <div>
                <Button
                  onClick={() => {
                    onOk(state.id);
                  }}>
                  确认
                </Button>
              </div>
            </Card>
          );
        })}
      </Modal>
    );
  };

  const MethodModal: React.FC<Partial<{
    onOk: any;
    onCancel: any;
    visible: boolean;
  }>> = ({ onOk, visible, onCancel }) => {
    return (
      <Modal visible={visible} onCancel={onCancel}>
        {methods.map(method => {
          return (
            <Card>
              <div>name: {method.name}</div>
              <div>id: {method.id}</div>
              <div>
                <Button
                  onClick={() => {
                    onOk(method.id);
                  }}>
                  确认
                </Button>
              </div>
            </Card>
          );
        })}
      </Modal>
    );
  };

  const AjaxModal: React.FC<Partial<{
    onOk: any;
    onCancel: any;
    visible: boolean;
  }>> = ({ onOk, visible, onCancel }) => {
    return <Modal visible={visible} onCancel={onCancel}></Modal>;
  };

  const insertCodeToPosition = (_code: string) => {
    const cursorLineArray = _.cloneDeep(cursorPosition.current.doc[cursorPosition.current.row].split(''));
    cursorLineArray.splice(cursorPosition.current.column, 0, _code);
    cursorPosition.current.doc[cursorPosition.current.row] = cursorLineArray.join('');
    setMethodCode(() => {
      const code = cursorPosition.current.doc.join('\n');
      return code;
    });
  };

  return (
    <div>
      <div>方法</div>
      <div>
        <div>
          {methods.map(method => {
            return (
              <Card>
                <div>方法名: {method.name}</div>
                <div>
                  <Button
                    onClick={() => {
                      onOk('method', method.id);
                    }}>
                    确认
                  </Button>
                  <Button>修改</Button>
                </div>
              </Card>
            );
          })}
        </div>
        <div>
          <Button onClick={() => setMethodConfigerVisible(true)}>添加方法</Button>
        </div>
      </div>
      <Drawer
        width={400}
        visible={methodConfigerVisible}
        onClose={() => setMethodConfigerVisible(false)}
        title="方法编辑">
        <div>
          <div>
            <span>方法名称</span>
          </div>
          <div>
            <Input value={methodName} onChange={e => setMethodName(e.target.value)} />
          </div>
        </div>
        <div>
          <div>
            <span>方法生成工具</span>
          </div>
          <Row>
            <Col span={6}>
              <Button
                onClick={() => {
                  setStateModalVisible(true);
                }}>
                获取状态
              </Button>
              <StateModal
                visible={stateModalVisible}
                onCancel={() => {
                  setStateModalVisible(false);
                }}
                onOk={(id: string) => {
                  console.log(id);
                  setStateModalVisible(false);
                }}
              />
            </Col>
            <Col span={6}>
              <Button
                onClick={() => {
                  setStateChangerModalVisible(true);
                }}>
                修改状态
              </Button>
              <StateModal
                visible={stateChangerModalVisible}
                onCancel={() => {
                  setStateChangerModalVisible(false);
                }}
                onOk={(stateId: string) => {
                  setStateChangerModalVisible(false);
                  insertCodeToPosition(`setState('${stateId}', )`);
                }}
              />
            </Col>
            <Col span={6}>
              <Button
                onClick={() => {
                  setAjaxModalVisible(true);
                }}>
                ajax请求
              </Button>
              <AjaxModal
                onCancel={() => {
                  setAjaxModalVisible(false);
                }}
                visible={ajaxModalVisible}
                onOk={() => {}}
              />
            </Col>
            <Col span={6}>
              <Button
                onClick={() => {
                  setMethodModalVisible(true);
                }}>
                关联方法
              </Button>
              <MethodModal
                onCancel={() => {
                  setMethodModalVisible(false);
                }}
                visible={methodModalVisible}
                onOk={(methodId: string) => {
                  setMethodModalVisible(false);
                  insertCodeToPosition(`emit('method:${methodId}')`);
                }}
              />
            </Col>
          </Row>
        </div>
        <div>方法关联关系</div>
        <div></div>
        <div>方法代码</div>
        <div>
          <AceEditor
            value={methodCode}
            mode={'javascript'}
            theme={'github'}
            onChange={value => setMethodCode(value)}
            enableBasicAutocompletion={['getState', 'ajax', 'changeState', 'method']}
            onCursorChange={value => {
              cursorPosition.current = {
                doc: value.doc.$lines,
                row: value.cursor.row,
                column: value.cursor.column,
              };
            }}
            setOptions={{
              showLineNumbers: true,
              tabSize: 4,
              highlightActiveLine: true,
            }}
          />
        </div>
        <div>
          <Button
            onClick={() => {
              if (selectElementId) {
                const node = astTool.getNodeById(selectElementId);
                if (node) {
                  const method = astTool.appendMethod(methodCode, methodName, node);
                  setMethodConfigerVisible(false);
                }
              }
            }}>
            确认
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

const PropertyEditor: React.FC<{
  onOk: onOkType;
}> = ({ onOk }) => {
  const [propertyType, setPropertyType] = useState<string>('static');

  const renderEditPanel = () => {
    switch (propertyType) {
      case 'static':
        return <StaticDataViewer onOk={onOk} />;
      case 'state':
        return <StateDataViewer onOk={onOk} />;
      case 'method':
        return <MethodDataViewer onOk={onOk} />;
    }
  };

  return (
    <div>
      <div>
        <div>属性类型</div>
        <Radio.Group
          value={propertyType}
          onChange={e => {
            setPropertyType(e.target.value);
          }}>
          <Radio.Button value={'static'}>静态数据</Radio.Button>
          <Radio.Button value={'state'}>状态</Radio.Button>
          <Radio.Button value={'method'}>方法</Radio.Button>
        </Radio.Group>
      </div>
      <div>{renderEditPanel()}</div>
    </div>
  );
};

export default PropertyEditor;
