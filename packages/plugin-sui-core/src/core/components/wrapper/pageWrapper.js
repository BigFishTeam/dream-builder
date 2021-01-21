/**
 * Created by zenli on 2018/10/10.
 * 页面级最外层的壳组件
 * 所有交互组件的根
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../themes/sui.less';
import './style/pageWrapper.less';

import InterationContext from './context/interaction.context';
const { CollapsedContext } = InterationContext;
const { ScrollContext } = InterationContext;

class PageWrapper extends Component {
  constructor(props) {
    super(props);
    this.toggleCollapsed = () => {
      sessionStorage.setItem('menu-collapsed', !this.state.collapsed);
      this.setState(state => ({
        collapsed: !state.collapsed
      }));
    };

    this.state = {
      // 是否折叠
      collapsed:
        sessionStorage.getItem('menu-collapsed') === null
          ? this.props.defaultCollapsed
          : sessionStorage.getItem('menu-collapsed') === 'true',
      toggleCollapsed: this.toggleCollapsed,
      // 是否开启局部滚动
      allowScroll: this.props.layoutType === 'partScroll'
    };
  }

  render() {
    const { children, layoutType, collapsed } = this.props;
    let collapsedValue = {};
    collapsed !== undefined
      ? (collapsedValue = { collapsed })
      : (collapsedValue = this.state);
    return (
      <CollapsedContext.Provider value={collapsedValue}>
        <ScrollContext.Provider value={this.state}>
          <div
            className="sui-page-wrapper"
            style={{
              overflow: layoutType === 'partScroll' ? 'visible' : 'auto'
            }}
          >
            {children}
          </div>
        </ScrollContext.Provider>
      </CollapsedContext.Provider>
    );
  }
}

PageWrapper.propTypes = {
  /** 是否收起左侧导航
   *  默认为false
   */
  defaultCollapsed: PropTypes.bool,
  /**
   * collapsed
   * 启用：业务方完全控制左侧收起，默认功能失效
   * 默认不开启
   */
  collapsed: PropTypes.bool,
  /** 布局类型
   * 默认为局部滚动
   * 需要全局滚动时设置为globalScroll
   */
  layoutType: PropTypes.string,
  children: PropTypes.any
};

PageWrapper.defaultProps = {
  defaultCollapsed: false,
  layoutType: 'partScroll'
};

export default PageWrapper;
