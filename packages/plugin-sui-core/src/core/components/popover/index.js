/**
 * @file index.js
 * @date 2019-02-26 15.10.20
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, Popover } from 'antd';

import './style/index.less';

const propTypes = {
  /** 标题 */
  label: PropTypes.string,
  /** 解释说明 支持antd Popover的title、content两个参数 */
  popover: PropTypes.object
};
const defaultProps = {
  label: '帮助',
  popover: {}
};
class SodaPopover extends Component {
  state = {};

  render() {
    const { popover, label } = this.props;
    const { title, content } = popover || {};
    return (
      <div className="sui-popover">
        <Popover title={title} content={content}>
          <span className="popover-icon">
            <Icon type="question-circle" theme="filled" />
          </span>
          <span className="text">{label}</span>
        </Popover>
      </div>
    );
  }
}

SodaPopover.propTypes = propTypes;
SodaPopover.defaultProps = defaultProps;
export default SodaPopover;
