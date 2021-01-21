/*
 * @Date: 2018-11-10 11:16:44
 * @Last Modified time: 2020-07-27 19:33:21
 */

import React, { Component } from 'react';

import './style/content.less';

class NarrowContent extends Component {
  state = {};

  render() {
    const {
      children,
      allowScroll,
      contentClassName,
      contentStyle
    } = this.props;
    return (
      <div
        style={contentStyle || {}}
        className={`sui-page-content-narrow ${
          allowScroll ? 'sui-page-content-allowScroll' : ''
        } ${contentClassName || ''}`}
      >
        {children}
      </div>
    );
  }
}

export default NarrowContent;
