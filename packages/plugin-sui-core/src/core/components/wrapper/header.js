/*
 * @Date: 2018-11-10 11:20:37
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-06 16:11:16
 */

import React, { Component } from 'react';

import CollapsedTrigger from './../collapsedTrigger/index';

import './style/header.less';

class Header extends Component {
  state = {};

  render() {
    // trigger === null 不使用trigger逻辑
    const { children, triggerOnClick, trigger } = this.props;
    return (
      <div className="sui-page-header">
        {trigger === null ? (
          ''
        ) : (
          <CollapsedTrigger triggerOnClick={triggerOnClick} />
        )}
        <div className="right">{children}</div>
      </div>
    );
  }
}

export default Header;
