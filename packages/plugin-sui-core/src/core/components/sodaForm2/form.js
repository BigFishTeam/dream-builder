/* eslint-disable prefer-const, prettier/prettier */
/*
 * @Date: 2018-12-12 11:07:55
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-06 16:09:33
 */

import React, { Component } from 'react';
import { Form, Button } from 'antd';
import classNames from 'classnames';
// import cleanDeep from 'clean-deep';

import SodaFormItem from './item';

import './style.less';

class SodaForm extends Component {
  static defaultProps = {
    className: null,
    layout: 'horizontal',
    labelAlign: 'right',
    hideRequiredMark: false,
    colon: true,

    disabled: false, // 禁用
    config: [], // 配置项

    labelWidth: 80,
    btnSpan: 6,
    submitBtnText: '提交',
    resetBtnText: '重置',
    operatorBtns: true,
    resetBtn: false,
    btnLoading: false,
    validator: false,
    formLayout: null,
    onSubmit: () => {},
    onReset: () => {},
    onChange: () => {},
    onValidate: () => {},
    onValidateFailed: () => {}
  };

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(newProps) {
    const {
      form: { validateFieldsAndScroll },
      validator,
      onValidate
    } = this.props;
    if (!validator && newProps.validator) {
      validateFieldsAndScroll((err, values) => {
        onValidate(err, values);
      });
    }
  }

  // 生成表单
  builderForm() {
    const {
      form,
      config,
      layout,
      labelCol = { span: 4 },
      wrapperCol = { span: 14 }
    } = this.props;

    let formConfig;

    if (typeof config === 'function') {
      formConfig = config(this.props.form);
    } else {
      formConfig = config;
    }

    return formConfig.map((field, index) => {
      const { emptyLable } = field;

      let formItemLayout = null;
      if (layout === 'horizontal') {
        if (emptyLable) {
          formItemLayout = {
            wrapperCol: Object.assign(
              {
                offset: labelCol.span
              },
              wrapperCol
            )
          };
        } else {
          formItemLayout = {
            labelCol,
            wrapperCol
          };
        }
      }

      return (
        <SodaFormItem
          key={`form_item_${index}`}
          field={field}
          form={form}
          layout={formItemLayout}
        />
      );
    });
  }

  // 生成按钮
  buildBtns() {
    const {
      layout,
      submitBtnText,
      resetBtnText,
      resetBtn,
      btnLoading
    } = this.props;

    const btns = (
      <Form.Item>
        <Button
          type="primary"
          loading={btnLoading}
          onClick={this.onSubmitHandle}
        >
          {submitBtnText}
        </Button>
        {resetBtn ? (
          <Button style={{ marginLeft: 8 }} onClick={this.onResetHandle}>
            {resetBtnText}
          </Button>
        ) : null}
      </Form.Item>
    );

    return layout === 'inline' ? (
      btns
    ) : (
      <Form.Item wrapperCol={{ span: 14, offset: 4 }}>{btns}</Form.Item>
    );
  }

  getFormInstance() {
    return this.props.form;
  }

  // 提交事件
  onSubmitHandle = () => this.submitHandle();
  // 提交
  submitHandle = () =>
    new Promise((resolve, reject) => {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (err) {
          reject(err);
          this.props.onValidateFailed(err);
        } else {
          // 作为表单引擎，不应该过多干涉原始数据
          resolve(values);
          this.props.onSubmit(values);
        }
      });
    });

  // 重置事件
  onResetHandle = () => {
    this.resetHandle();
  };
  // 重置
  resetHandle = () => {
    this.clearFieldHandle();
    this.props.onReset();
  };

  setFieldsValue(key, value) {
    this.props.form.setFieldsValue(key, value);
  }
  clearFieldHandle() {
    this.props.form.resetFields();
  }

  render() {
    const {
      className,
      layout,
      labelAlign,
      hideRequiredMark,
      colon,
      children,
      operatorBtns
    } = this.props;
    return (
      <Form
        className={classNames('soda-form', className, {
          'advanced-search-form': layout === 'inline'
        })}
        layout={layout}
        labelAlign={labelAlign}
        hideRequiredMark={hideRequiredMark}
        colon={colon}
      >
        <div className="soda-form-body">
          {this.builderForm()}
          {children}
          {operatorBtns ? this.buildBtns() : null}
        </div>
      </Form>
    );
  }
}

export default Form.create({
  onValuesChange(props, field) {
    const key = Object.keys(field)[0];
    props.onChange && props.onChange(key, field[key]);
  }
})(SodaForm);
