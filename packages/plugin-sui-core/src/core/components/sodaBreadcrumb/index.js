/**
 * @file index.js
 * @date 2019-02-13 15.07.11
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './style/index.less';

class SodaBreadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { breadcrumbList, style } = this.props;
    const breadcrumbItems = breadcrumbList.map((item, index) =>
      item.path ? (
        <Breadcrumb.Item key={item.path}>
          <Link to={item.path}>{item.name}</Link>
        </Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item key={`${item.name}_${index}`}>
          {item.name}
        </Breadcrumb.Item>
      )
    );
    return (
      <Breadcrumb className="sui-breadcrumb" style={style}>
        {breadcrumbItems}
      </Breadcrumb>
    );
  }
}
SodaBreadcrumb.propTypes = {
  /** 面包屑项列表 */

  breadcrumbList: PropTypes.array,
  /** 自定义样式 */

  style: PropTypes.object
};
SodaBreadcrumb.defaultProps = {
  breadcrumbList: [],
  style: null
};

export default SodaBreadcrumb;
