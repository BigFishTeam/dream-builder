/*
 * @Author: zenli
 * @Date: 2018-11-27 10:43:23
 * 组件的标题
 * 常用于查询类的结果头部
 * @Last Modified by: lili
 * @Last Modified time: 2019-11-21 15:58:28
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, Tooltip, Popover } from 'antd';

import './style/caption.less';

const propTypes = {
  /** 组件的标题 */
  label: PropTypes.string,
  /** 组件内名称的解释说明；支持popover的placement、title、content三个antd组件参数 */
  popover: PropTypes.object
};
const defaultProps = {
  label: '查询结果',
  popover: {}
};
class Caption extends Component {
  state = {};

  logoClick = () => {
    window.href = window.location.origin;
  };
  render() {
    const { popover, label, children } = this.props;
    const { placement, title, content } = popover || {};
    const Comp = content ? Popover : Tooltip;
    return (
      <div className="sui-caption">
        <span className="text">{label}</span>
        {title ? (
          <Comp placement={placement || 'top'} title={title} content={content}>
            <span>
              <Icon type="question-circle" theme="filled" />
            </span>
          </Comp>
        ) : (
          ''
        )}
        {children}
      </div>
    );
  }
}

Caption.propTypes = propTypes;
Caption.defaultProps = defaultProps;
export default Caption;
