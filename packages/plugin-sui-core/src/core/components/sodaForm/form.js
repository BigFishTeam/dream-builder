/* eslint-disable prefer-const, prettier/prettier */
/*
 * @Date: 2018-12-12 11:07:55
 * @Last Modified time: 2021-01-06 16:08:01
 */

import React, { Component } from 'react';
import { Form, Row, Col, Button, Tooltip, Icon } from 'antd';
import classNames from 'classnames';
// import cleanDeep from 'clean-deep';

import Caption from '../caption/index';

import SodaInput from './antd/input';
import SodaSelect from './antd/select';
import SodaDatePicker from './antd/datepicker';
import SodaCheckbox from './antd/checkbox';
import SodaRadio from './antd/radio';
import Upload from './antd/upload';
import Cascader from './antd/cascader';
import Switch from './antd/switch';
import TreeSelect from './antd/treeSelect';

import './style.less';

const FormItem = Form.Item;

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

class SodaForm extends Component {
  static defaultProps = {
    className: null,
    layout: 'horizontal',
    disabled: false,
    config: [],
    labelWidth: 80,
    btnSpan: 12,
    submitBtnText: '提交',
    resetBtnText: '重置',
    operatorBtns: true,
    resetBtn: false,
    btnLoading: false,
    btnDisabled: false,
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

  clearFieldHandle() {
    this.props.form.resetFields();
  }

  setFieldsValue(params, callback) {
    this.props.form.setFieldsValue(params, callback);
  }

  // config => form
  builderForm() {
    const {
      form: { getFieldDecorator },
      config,
      layout,
      formLayout,
      labelWidth
    } = this.props;

    const formItemLayout =
      formLayout || layout === 'inline'
        ? {}
        : {
            labelCol: {
              style: {
                width: labelWidth
              }
            }
          };

    let formConfig;
    if (typeof config === 'function') {
      formConfig = config(this.props.form);
    } else {
      formConfig = config;
    }

    return formConfig.map((field, idx) => {
      let {
        type,
        label,
        span = 24,
        prop,
        required = false,
        initialValue,
        help,
        extra,
        message,
        payload = { props: {} },
        className,
        render,
        tip,
        disabled = false,
        visible = true,
        validatorRule,
        emptyLable = false,
        extraProps = {}
      } = field;

      const rules = {
        required
      };

      if (message) {
        rules.message = message;
      }

      if (tip) {
        label = (
          <>
            <span>{label}</span>
            <Tooltip placement="bottom" title={label}>
              <Icon
                type="question-circle"
                theme="filled"
                style={{
                  verticalAlign: 'baseline',
                  fontSize: '12px',
                  marginLeft: '3px'
                }}
              />
            </Tooltip>
          </>
        );
      }

      const renderComponent = () => {
        if (render) {
          return emptyLable ? (
            render(field, this.props.form)
          ) : (
            <FormItem
              {...formItemLayout}
              {...extraProps}
              key={`field_${prop}_${idx}`}
              help={help}
              extra={extra}
              label={label}
            >
              {render(field, this.props.form)}
            </FormItem>
          );
        }

        if (type) {
          payload.props = payload.props || {};
          payload.props.disabled = disabled || this.props.disabled;

          if (type === 'caption') {
            return <Caption label={label} />;
          }
          if (type === 'text') {
            return (
              <FormItem
                {...formItemLayout}
                {...extraProps}
                key={`field_${prop}_${idx}`}
                help={help}
                extra={extra}
                label={label}
              >
                <span className="multiple-line" {...payload.props}>
                  {initialValue}
                </span>
              </FormItem>
            );
          }
          if (mapper[type]) {
            return (
              <FormItem
                {...formItemLayout}
                {...extraProps}
                key={`field_${prop}_${idx}`}
                help={help}
                extra={extra}
                label={label}
              >
                {getFieldDecorator(prop, {
                  rules: validatorRule || [rules],
                  validateTrigger: 'onChange',
                  initialValue
                })(mapper[type](payload))}
              </FormItem>
            );
          }
          throw new Error(`Unkown type: ${type}!`);
        }

        throw new Error('Field required type or render property!');
      };

      const formFields = renderComponent();

      return visible ? (
        layout === 'inline' ? (
          formFields
        ) : (
          <Row>
            <Col
              key={`row_${prop}_${idx}`}
              span={span}
              className={classNames(className, {
                'soda-form-text': type === 'text'
              })}
            >
              {formFields}
            </Col>
          </Row>
        )
      ) : null;
    });
  }

  // 生成 operator btns
  getOperatorBtns() {
    const {
      layout,
      btnSpan,
      labelWidth,
      submitBtnText,
      resetBtnText,
      resetBtn,
      btnLoading,
      btnDisabled,
      disabled,
      extraOperator = null
    } = this.props;
    const btns = (
      <>
        <Button
          type="primary"
          style={{ marginRight: 8 }}
          loading={btnLoading}
          disabled={btnDisabled || disabled}
          onClick={this.onSubmitHandle}
        >
          {submitBtnText}
        </Button>
        {resetBtn ? (
          <Button
            style={{ marginRight: 8 }}
            onClick={this.onResetHandle}
            disabled={btnDisabled || disabled}
          >
            {resetBtnText}
          </Button>
        ) : null}
        {extraOperator}
      </>
    );
    return layout === 'inline' ? (
      <FormItem>{btns}</FormItem>
    ) : (
      <Row>
        <Col span={btnSpan}>
          <FormItem
            label=" "
            colon={false}
            labelCol={{
              style: {
                width: labelWidth
              }
            }}
          >
            {btns}
          </FormItem>
        </Col>
      </Row>
    );
  }

  getFormInstance() {
    return this.props.form;
  }

  // 提交 事件
  onSubmitHandle = () => this.submitHandle();

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

  // 重置 事件
  onResetHandle = () => {
    this.resetHandle();
  };

  // 重置 事件
  resetHandle = () => {
    this.clearFieldHandle();
    this.props.onReset();
  };

  render() {
    const { layout, children, operatorBtns } = this.props;
    return (
      <Form
        className={classNames('soda-form', this.props.className)}
        layout={layout}
      >
        <section className="soda-form-body">
          {this.builderForm()}
          {operatorBtns ? this.getOperatorBtns() : null}
          {children}
        </section>
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
