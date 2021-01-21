/*
 * @Date: 2018-11-10 12:05:21
 * @Last Modified time: 2019-02-22 17:49:33
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';
import platform from '../../utils/platform';

import './style/logo.less';

const propTypes = {
  /** logo图标；参数：svg转化的react无状态组件 */
  img: PropTypes.func.isRequired,
  /** logo文案；参数：文本/svg的react无状态组件 */
  text: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  /** 点击logo跳转链接 */
  url: PropTypes.string.isRequired,
  /** 是否收缩 */
  collapsed: PropTypes.bool.isRequired
};
const defaultProps = {
  collapsed: false,
  url: '/'
};
class Logo extends Component {
  state = {};

  logoClick = () => {
    const { url } = this.props;
    window.location.href = url;
  };

  render() {
    const { img, text, collapsed } = this.props;
    let textComponent = null;
    if (typeof text === 'string') {
      textComponent = (
        <span className={`text${platform.is.win ? ' win' : ''}`}>{text}</span>
      );
    } else {
      textComponent = text({
        width: '100%',
        height: '21.9px',
        fill: 'currentColor',
        preserveAspectRatio: 'xMinYMin meet'
      });
    }

    return (
      <div className="sui-logo" aria-hidden="true" onClick={this.logoClick}>
        <Icon component={img} />
        <div className={`name ${collapsed ? 'name-collapsed' : ''}`}>
          {textComponent}
        </div>
      </div>
    );
  }
}

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;
export default Logo;
