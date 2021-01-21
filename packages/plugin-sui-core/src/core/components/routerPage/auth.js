/**
 * @file auth.js
 * @date 2019-01-25 16.53.15
 */

import React, { Component } from 'react';
import SodaBreadcrumb from '../sodaBreadcrumb';
import NarrowContent from '../wrapper/narrowContent';
import Content from '../wrapper/content';
import InterationContext from '../wrapper/context/interaction.context';
const { ScrollContext } = InterationContext;

/** 获取认证后的组件
 * 参数如下：
 * wrappedComponent 传入组件
 * auth 认证方法Promise
 * routes 子路由信息
 * breadCrumbs 面包屑配置
 * name 标题名称
 * hideTitle 是否隐藏标题，默认为false
 * titleStyle 自定义标题样式
 * title 自定义标题名称
 * pageWrapper 页面容器类型，目前包含Content和NarrowContent两种
 * onEnter 进入页面时的钩子
 * onUpdate 页面更新时的钩子
 * onLeave 离开页面时的钩子
 */

class AuthorizedComp extends Component {
  state = {};

  // eslint-disable-next-line
  UNSAFE_componentWillMount() {
    const { onEnter } = this.props;
    if (onEnter) {
      onEnter();
    }
  }

  // eslint-disable-next-line
  UNSAFE_componentWillUpdate() {
    const { onUpdate } = this.props;
    if (onUpdate) {
      onUpdate();
    }
  }

  componentWillUnmount() {
    const { onLeave } = this.props;
    if (onLeave) {
      onLeave();
    }
  }

  render() {
    const {
      wrappedComponent,
      routes,
      breadCrumbs,
      name,
      hideTitle,
      titleStyle,
      title,
      pageWrapper,
      otherProps,
      ...contentProps
    } = this.props;
    // 页面头部
    const pageHeader = breadCrumbs ? (
      <SodaBreadcrumb breadcrumbList={breadCrumbs} style={titleStyle} />
    ) : hideTitle ? null : (
      <span className="sui-title" style={titleStyle}>
        {title || name}
      </span>
    );

    // 认证后页面主体部分
    const authorizedComp = (
      <>
        {pageHeader}
        <wrappedComponent.component
          match={otherProps.match}
          routerConfig={routes}
          {...otherProps}
        />
      </>
    );

    /** 获取页面容器类型, 默认为'NarrowContent'
     * 目前只支持NarrowContent和Content两种，后续可扩展多种类型
     */

    const getCompWrapper = () => {
      const wrapperType = pageWrapper || 'NarrowContent';

      return (
        <ScrollContext.Consumer>
          {typeof wrapperType === 'string'
            ? ({ allowScroll = true }) =>
                wrapperType === 'Content' ? (
                  <Content allowScroll={allowScroll} {...contentProps}>
                    {authorizedComp}
                  </Content>
                ) : (
                  <NarrowContent allowScroll={allowScroll} {...contentProps}>
                    {authorizedComp}
                  </NarrowContent>
                )
            : () => {
                const CoralContent = wrapperType(authorizedComp);
                return <CoralContent />;
              }}
        </ScrollContext.Consumer>
      );
    };

    return getCompWrapper();
  }
}

export default AuthorizedComp;
