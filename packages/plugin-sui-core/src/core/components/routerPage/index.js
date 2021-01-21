/**
 * @file index.js
 * @date 2019-01-24 16.29.41
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import AuthorizedComp from './auth';

class RouterPage extends Component {
  state = {};
  // 递归获取子路由页面
  getSubRoutes = item => {
    const {
      routes,
      exact,
      path,
      name,
      title,
      hideTitle,
      titleStyle,
      pageWrapper,
      component,
      auth,
      breadCrumbs,
      onEnter,
      onUpdate,
      onLeave
    } = item;

    // 拼接当前路由的面包屑列表
    const breadCrumbList =
      breadCrumbs && breadCrumbs.concat([{ path, name, isLast: true }]);
    // 渲染一级页面，子页面在父组件内根据routerConfig自行渲染
    if (component) {
      return (
        <Route
          exact={exact}
          path={path}
          key={path}
          render={props => (
            <AuthorizedComp
              wrappedComponent={{ component }}
              auth={auth}
              routes={routes}
              breadCrumbList={breadCrumbList}
              name={name}
              hideTitle={hideTitle}
              titleStyle={titleStyle}
              title={title}
              pageWrapper={pageWrapper}
              onEnter={onEnter}
              onUpdate={onUpdate}
              onLeave={onLeave}
              otherProps={props}
              {...this.props}
            />
          )}
        />
      );
    }
    return this.getRoutes(routes);
  };

  // 获取具有权限的路由页面
  getRoutes = routeData => {
    if (!routeData) {
      return [];
    }
    return routeData.map(item => this.getSubRoutes(item)).filter(item => item);
  };

  render() {
    const { routeData, isRoot, ...others } = this.props;
    const pageRoutes = this.getRoutes(isRoot ? routeData.data : routeData);

    return isRoot ? (
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to={routeData.defaultSelectedKey} />}
          />
          {pageRoutes}
        </Switch>
      </HashRouter>
    ) : (
      <div {...others}>{pageRoutes}</div>
    );
  }
}

RouterPage.propTypes = {
  /** 页面配置数据 根路由页面传整个对象,非根路由页面传data数组
   * 参考/src/routerPage.config.js
   * */
  routeData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  /** 是否为根路由页面
   * 默认为true
   * 非根路由页面传false
   * */
  isRoot: PropTypes.bool,
  /** 页面content部分外部样式类名
   * 默认为空
   * */
  contentClassName: PropTypes.string,
  /** 页面content部分外部style样式
   * 默认为空
   * */
  contentStyle: PropTypes.object
};
RouterPage.defaultProps = {
  routeData: {
    defaultSelectedKey: '',
    data: []
  },
  isRoot: true,
  contentClassName: '',
  contentStyle: {}
};

export default RouterPage;
