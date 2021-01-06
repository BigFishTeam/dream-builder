import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {
  Modal,
  Row,
  Col,
  Form,
  Input,
  Select,
  Radio,
  Button,
  Switch,
  Divider,
  InputNumber,
  Checkbox,
  TimePicker,
  DatePicker,
} from 'antd';
import { BaseMaterial } from '../base';
import { Icon, Desc, IsLayout, Material, NodeDC, Config } from '../../decorators';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import { useForm } from 'antd/lib/form/util';

interface FormItemType {
  name: string;
  rule: string;
  type: 'input' | 'textarea' | 'numberPicker' | 'checkbox' | 'select' | 'radio' | 'switch' | 'time' | 'date';
  options?: string[];
}

@Icon(require('../../../imgs/form.png'), 'src')
@Desc('这个是form物料')
@IsLayout(false)
@Material()
@NodeDC(1)
class FormMaterial extends BaseMaterial {
  formRef = React.createRef();
  static async beforeInstantiate() {
    const modal = () => {
      return new Promise((resolve, reject) => {
        const ConfigerModal = () => {
          const [modalVisible, setModalVisible] = useState<boolean>(true);
          const [formItem, setFormItem] = useState<FormItemType[]>([]);
          const [form] = Form.useForm();

          const onFill = () => {
            const fields = form.getFieldsValue();
            Object.keys(fields).forEach(key => {
              const splitedKey = key.split('_');
              if (splitedKey.length > 1) {
                const idx = parseInt(splitedKey[1]);
                const itemKey = splitedKey[2];
                if (itemKey === 'type') {
                  const option = formItem[idx] || {};
                  (option as any)[itemKey] = fields[key];
                  setFormItem(items => {
                    const clonedItems = _.cloneDeep(items);
                    clonedItems[idx] = option;
                    return clonedItems;
                  });
                }
              }
            });
          };

          const renderFormItems = (item: FormItemType, idx: number) => {
            return (
              <>
                <FormItem>
                  <Divider type="horizontal" />
                </FormItem>
                <FormItem name={`item_${idx}_label`} label={`表单项${idx}标签`} required>
                  <Input />
                </FormItem>
                <FormItem name={`item_${idx}_name`} label={`表单项${idx}字段名`} required>
                  <Input />
                </FormItem>
                <FormItem name={`item_${idx}_type`} label={`表单项${idx}类型`} required>
                  <Radio.Group>
                    <Radio.Button value="input">输入框</Radio.Button>
                    <Radio.Button value="textarea">大段文本输入框</Radio.Button>
                    <Radio.Button value="numberPicker">数字选择器</Radio.Button>
                    <Radio.Button value="select">选择器</Radio.Button>
                    <Radio.Button value="radio">单选</Radio.Button>
                    <Radio.Button value="checkbox">多选</Radio.Button>
                    <Radio.Button value="time">时间</Radio.Button>
                    <Radio.Button value="date">日期</Radio.Button>
                  </Radio.Group>
                </FormItem>
                <FormItem name={`item_${idx}_rule`} label={`表单项${idx}校验规则`}>
                  <Input />
                </FormItem>
                <FormItem name={`item_${idx}_necessary`} label={`表单项${idx}是否必选`} required>
                  <Switch />
                </FormItem>
                <FormItem name={`item_${idx}_extra`} label={`表单项${idx}额外信息`}>
                  <Input />
                </FormItem>
                <FormItem name={`item_${idx}_init`} label={`表单项${idx}初始值`}>
                  <Input />
                </FormItem>
                {new Set(['select', 'radio', 'checkbox']).has(item.type) && (
                  <FormItem
                    help={'格式形如${key}-${value}|${key}-${value}'}
                    name={`item_${idx}_options`}
                    label={`表单项${idx}选项`}>
                    <Input />
                  </FormItem>
                )}
              </>
            );
          };

          return (
            <Modal
              title="配置表单"
              visible={modalVisible}
              onCancel={() => {
                setModalVisible(false);
              }}
              onOk={() => {
                setModalVisible(false);
                resolve(form.getFieldsValue());
              }}>
              <Row>
                <Form form={form} onFieldsChange={onFill}>
                  <Form.Item name="name" label="表单名" required>
                    <Input />
                  </Form.Item>
                  <Form.Item name="label" label="标签位置" required>
                    <Radio.Group>
                      <Radio.Button value="left">左对齐</Radio.Button>
                      <Radio.Button value="right">右对齐</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item name="size" label="表单尺寸" required>
                    <Radio.Group>
                      <Radio.Button value="small">Small</Radio.Button>
                      <Radio.Button value="middle">Middle</Radio.Button>
                      <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                  <FormItem name="path" label="地址" required>
                    <Input />
                  </FormItem>
                  <FormItem name="method" label="方法" required>
                    <Radio.Group>
                      <Radio.Button value="get">GET</Radio.Button>
                      <Radio.Button value="post">POST</Radio.Button>
                    </Radio.Group>
                  </FormItem>
                  <FormItem name="format" label="格式" required>
                    <Radio.Group>
                      <Radio.Button value="json">JSON</Radio.Button>
                      <Radio.Button value="table">表单</Radio.Button>
                    </Radio.Group>
                  </FormItem>
                  <FormItem name="sure" label="确定键文字" required>
                    <Input />
                  </FormItem>
                  <FormItem name="reset" label="是否有重置键" required>
                    <Switch />
                  </FormItem>
                  {formItem.map((item, idx) => {
                    return renderFormItems(item, idx);
                  })}
                  <Form.Item>
                    <Button
                      onClick={() => {
                        setFormItem(items => {
                          items.push({} as any);
                          return _.cloneDeep(items);
                        });
                      }}>
                      新增表单项
                    </Button>
                  </Form.Item>
                </Form>
              </Row>
            </Modal>
          );
        };
        ReactDOM.render(<ConfigerModal />, document.getElementById('root-append'));
      });
    };
    return await modal();
  }

  @Config()
  private createProps = null;

  @Config()
  private onSuccess = null;

  @Config()
  private onError = null;

  private onFinish(form: any) {
    return () => {
      const fields = (this.formRef.current as ReturnType<typeof useForm>[0]).getFieldsValue();
      const ajax = this.getAjax().getClient();
      if (form.method === 'get') {
        ajax
          .get(form.path, {
            data: fields,
          })
          .then(res => {
            if (_.isFunction((this.props as any).onSuccess)) {
              (this.props as any).onSuccess(res.data);
            }
          })
          .catch(err => {
            if (_.isFunction((this.props as any).onError)) {
              (this.props as any).onError(err);
            }
          });
      } else {
        ajax.post(form.path, fields);
      }
    };
  }

  instantiate(createProps?: any) {
    const form = {
      name: '',
      label: 'left',
      size: 'normal',
      sure: '确定',
      fields: {},
      reset: false,
      method: 'get',
      format: 'json',
      path: '',
    };
    Object.keys(createProps).forEach(key => {
      const splitedKey = key.split('_');
      if (splitedKey.length > 1) {
        const idx = splitedKey[1];
        const itemKey = splitedKey[2];
        if (!(form as any).fields[idx]) {
          (form as any).fields[idx] = {};
        }
        (form as any).fields[idx][itemKey] = createProps[key];
      } else {
        (form as any)[key] = createProps[key];
      }
    });

    const renderFieldItem = (field: {
      name: string;
      label: string;
      type: string;
      rule: string;
      necessary: boolean;
      extra: string;
      init: string;
      options?: string;
    }) => {
      let Item: any = null;

      const fieldOptions = field.options;
      const options: { name?: string; value?: string }[] = [];
      if (fieldOptions) {
        const parseOptions = (str: string) => {
          try {
            let optionReg = /\$\{([a-zA-Z0-9\u4e00-\u9fa5]{0,18})\}\$/g;
            const obj = { name: undefined, value: undefined };
            str.match(optionReg)?.map((gp, idx) => {
              if (!((idx + 1) % 2)) {
                optionReg = /\$\{([a-zA-Z0-9\u4e00-\u9fa5]{0,18})\}\$/g;
                (obj.value as any) = (optionReg.exec(gp) as any)[1];
                options.push(_.cloneDeep(obj));
              } else {
                optionReg = /\$\{([a-zA-Z0-9\u4e00-\u9fa5]{0,18})\}\$/g;
                (obj.name as any) = (optionReg.exec(gp) as any)[1];
              }
            });
          } catch (e) {
            console.log(e);
            return [];
          }
        };
        parseOptions(fieldOptions);
      }

      switch (field.type) {
        case 'input':
          Item = <Input></Input>;
          break;
        case 'textarea':
          Item = <TextArea></TextArea>;
          break;
        case 'numberPicker':
          Item = <InputNumber></InputNumber>;
          break;
        case 'select':
          Item = (
            <Select>
              {options.map(option => {
                return <Select.Option value={option?.value || ''}>{option.name}</Select.Option>;
              })}
            </Select>
          );
          break;
        case 'radio':
          Item = (
            <Radio>
              {options.map(option => {
                return <Radio.Button value={option?.value || ''}>{option.name}</Radio.Button>;
              })}
            </Radio>
          );
          break;
        case 'checkbox':
          Item = <Checkbox></Checkbox>;
          break;
        case 'time':
          Item = <TimePicker></TimePicker>;
          break;
        case 'date':
          Item = <DatePicker></DatePicker>;
          break;
      }

      return (
        <FormItem
          rules={[{ pattern: new RegExp(field.rule || ''), message: `不符合规则${field.rule || ''}` }]}
          name={field.name}
          label={field.label}
          required={field.necessary}
          extra={field.extra}>
          {Item}
        </FormItem>
      );
    };

    return (
      <div>
        <Form
          onFinish={this.onFinish(form)}
          ref={this.formRef as any}
          title={form.name}
          size={form.size as any}
          labelAlign={form.label as any}>
          {Object.keys(form.fields).map(key => {
            const field = (form.fields as any)[key];
            return renderFieldItem(field);
          })}
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                marginRight: '12px',
              }}>
              {form.sure}
            </Button>
            <Button
              type="primary"
              onClick={() => {
                (this.formRef.current as any).resetFields();
              }}>
              重置
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default FormMaterial;
