import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import 'reflect-metadata';
import { Table, Modal, Input, Button, Divider } from 'antd';
import { BaseMaterial } from '../base';
import { Icon, Desc, IsLayout, Material, NodeDC, Config } from '../../decorators';
import { useForm } from 'antd/lib/form/util';
import Form from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
interface columnType {
  columnKey: string;
  columnName: string;
}

@Icon(require('../../../imgs/table.png'), 'src')
@Desc('这个是table物料')
@IsLayout(false)
@Material()
@NodeDC(1)
export default class TableMaterial extends BaseMaterial {
  constructor(props: any) {
    super(props);
  }

  static async beforeInstantiate() {
    const modal = () => {
      return new Promise((resolve, reject) => {
        const ConfigerModal = () => {
          const [modalVisible, setModalVisible] = useState<boolean>(true);
          const [tableColumns, setTableColumns] = useState<columnType[]>([]);

          const [form] = useForm();

          const changeDataInTableColumns = ({ index, key, value }: { index: any; key: any; value: any }) => {
            setTableColumns(preTableColumns => {
              (preTableColumns as any)[index][key] = value as any;
              return [...preTableColumns];
            });
          };

          return (
            <Modal
              title="配置表格"
              visible={modalVisible}
              onCancel={() => {
                setModalVisible(false);
              }}
              onOk={() => {
                setModalVisible(false);
                resolve(tableColumns);
              }}>
              <FormItem>
                <Button
                  onClick={() => {
                    setTableColumns(preTableColumns => {
                      return [
                        ...preTableColumns,
                        {
                          columnKey: '',
                          columnName: '',
                        },
                      ];
                    });
                  }}>
                  新增表格列
                </Button>
              </FormItem>
              {tableColumns.map((tableColumn, idx) => {
                return (
                  <>
                    <FormItem>
                      <Divider type="horizontal" />
                    </FormItem>
                    <FormItem label={'列的key'}>
                      <Input
                        value={tableColumn.columnKey}
                        onChange={e => {
                          changeDataInTableColumns({
                            index: idx,
                            key: 'columnKey',
                            value: e.target.value,
                          });
                        }}
                      />
                    </FormItem>
                    <FormItem label={'列的label'}>
                      <Input
                        value={tableColumn.columnName}
                        onChange={e => {
                          changeDataInTableColumns({
                            index: idx,
                            key: 'columnName',
                            value: e.target.value,
                          });
                        }}
                      />
                    </FormItem>
                  </>
                );
              })}
            </Modal>
          );
        };
        ReactDOM.render(<ConfigerModal />, document.getElementById('root-append'));
      });
    };
    return await modal();
  }

  @Config()
  private data = [];

  @Config()
  private onChange = () => {};

  instantiate(createProps?: any) {
    const columns: { title: string; dataIndex: any; key: any }[] = [];
    if (_.isArray(createProps)) {
      (createProps as columnType[]).forEach(column => {
        columns.push({
          title: column.columnName,
          dataIndex: column.columnKey,
          key: column.columnKey,
        });
      });
    }
    return <Table columns={columns} dataSource={((this.props as any).data || this.data) as any} />;
  }
}
