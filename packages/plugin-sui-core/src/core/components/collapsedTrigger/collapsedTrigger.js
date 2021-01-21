/*
 * @Date: 2018-11-10 12:05:32
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-06 16:04:47
 * 描述：操作左侧导航是否收起的按钮
 * 参数：无
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

import './style/collapsedTrigger.less';

import InterationContext from '../wrapper/context/interaction.context';
const { CollapsedContext } = InterationContext;

const propTypes = {
  /** trigger事件的触发函数 */
  triggerOnClick: PropTypes.func
};
const defaultProps = {};
class CollapsedTrigger extends Component {
  state = {};

  render() {
    const { triggerOnClick } = this.props;
    return (
      <CollapsedContext.Consumer>
        {({ toggleCollapsed, collapsed }) => (
          <div
            className="sui-collapsed-trigger"
            aria-hidden="true"
            onClick={triggerOnClick ? triggerOnClick : toggleCollapsed}
          >
            <Icon
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              theme="outlined"
            />
          </div>
        )}
      </CollapsedContext.Consumer>
    );
  }
}

CollapsedTrigger.propTypes = propTypes;
CollapsedTrigger.defaultProps = defaultProps;
export default CollapsedTrigger;
