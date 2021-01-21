/**
 * Created by zenli on 2018/10/10.
 * 右栏
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/rightWrapper.less';

import InterationContext from './context/interaction.context';
const { ScrollContext } = InterationContext;

const propTypes = {
  /** 右侧正文自适应模式：容器宽度是否根据内容自适应。默认铺满整个屏幕 */
  adaptable: PropTypes.bool.isRequired,
  children: PropTypes.any
};
const defaultProps = {
  adaptable: false
};
class RightWrapper extends Component {
  state = {};

  render() {
    const { children, adaptable } = this.props;
    const minHeight = adaptable ? '100%' : '';

    return (
      <ScrollContext.Consumer>
        {({ allowScroll = true }) => (
          <div
            className="sui-right-wrapper"
            style={{ minHeight, height: allowScroll ? '100%' : '' }}
          >
            {children}
          </div>
        )}
      </ScrollContext.Consumer>
    );
  }
}

RightWrapper.propTypes = propTypes;
RightWrapper.defaultProps = defaultProps;
export default RightWrapper;
