/**
 * @file codeBox.js
 * @date 2019-04-18 11.29.51
 */

import React, { Component } from 'react';
import { Card, Collapse, Table } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const { Panel } = Collapse;

const columns = [
  {
    title: '参数',
    dataIndex: 'params',
    key: 'params'
  },
  {
    title: '说明',
    dataIndex: 'des',
    key: 'des'
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '默认值',
    dataIndex: 'default',
    key: 'default'
  }
];

class CodeBox extends Component {
  render() {
    const { demo, api } = this.props;
    // demo
    const demoList =
      demo && demo.length
        ? demo.map((item, index) => {
            const demoComponent = item.component;
            return (
              <div key={`codebox_${index}`}>
                <Card
                  title={item.title || '示例'}
                  style={{ marginTop: '20px' }}
                >
                  {demoComponent}
                </Card>
                <Collapse style={{ marginTop: '-1px' }}>
                  <Panel header="代码演示" key="1">
                    <SyntaxHighlighter language="javascript" style={docco}>
                      {item.code}
                    </SyntaxHighlighter>
                  </Panel>
                </Collapse>
              </div>
            );
          })
        : null;
    // api
    const apiList =
      api && api.length
        ? api.map((item, index) => {
            return (
              <Card
                title={item.title}
                style={{ marginTop: '20px' }}
                key={`api_${index}`}
              >
                <Table
                  dataSource={item.data}
                  columns={columns}
                  pagination={false}
                />
              </Card>
            );
          })
        : null;
    const apiListCard = apiList ? (
      <Card title="API" style={{ marginTop: '20px' }}>
        {apiList}
      </Card>
    ) : null;
    return (
      <div>
        {demoList}
        {apiListCard}
      </div>
    );
  }
}

export default CodeBox;
