/*
 * @Date: 2018-11-10 11:16:44
 * @Last Modified time: 2020-07-27 19:34:03
 */

import React, { Component } from 'react';

import './style/content.less';

class Content extends Component {
  state = {};

  render() {
    const {
      children,
      allowScroll,
      contentStyle,
      contentClassName
    } = this.props;
    return (
      <div
        style={contentStyle || {}}
        className={`sui-page-content ${
          allowScroll ? 'sui-page-content-allowScroll' : ''
        } ${contentClassName || ''}`}
      >
        {children}
      </div>
    );
  }
}

export default Content;
