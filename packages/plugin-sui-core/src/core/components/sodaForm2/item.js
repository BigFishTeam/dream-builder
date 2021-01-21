/*
 * @Date: 2019-05-28 14:18:54
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-06 16:09:43
 */

import React, { Component } from 'react';
import { Form } from 'antd';

import SodaInput from '../sodaForm/antd/input';
import SodaSelect from '../sodaForm/antd/select';
import SodaDatePicker from '../sodaForm/antd/datepicker';
import SodaCheckbox from '../sodaForm/antd/checkbox';
import SodaRadio from '../sodaForm/antd/radio';
import Upload from '../sodaForm/antd/upload';
import Cascader from '../sodaForm/antd/cascader';
import Switch from '../sodaForm/antd/switch';
import TreeSelect from '../sodaForm/antd/treeSelect';

const mapper = {
  input: SodaInput,
  select: SodaSelect,
  date: SodaDatePicker,
  checkbox: SodaCheckbox,
  radio: SodaRadio,
  upload: Upload,
  cascader: Cascader,
  switch: Switch,
  treeSelect: TreeSelect
};

export class SodaFormItem extends Component {
  static defaultProps = {
    form: {},
    field: {},
    layout: {}
  };

  build() {
    const {
      type,
      prop,
      required = false,
      initialValue,
      message,
      payload = { props: {} },
      render,
      disabled = false,
      validatorRule,
      validator
    } = this.props.field;

    if (render) {
      return render(this.props.field, this.props.form);
    }

    if (type) {
      payload.props = payload.props || {};
      payload.props.disabled = disabled || this.props.disabled;
      if (type === 'text') {
        return <span {...payload.props}>{initialValue}</span>;
      }
      if (mapper[type]) {
        return this.props.form.getFieldDecorator(prop, {
          rules: validatorRule ||
            validator || [
              {
                required,
                message
              }
            ],
          validateTrigger: 'onChange',
          initialValue
        })(mapper[type](payload));
      }
    }
  }

  render() {
    const { field, layout } = this.props;
    const { prop, help, extra, label } = field;
    return (
      <Form.Item
        {...layout}
        key={`field_${prop}`}
        help={help}
        extra={extra}
        label={label}
      >
        {this.build()}
      </Form.Item>
    );
  }
}

export default SodaFormItem;
