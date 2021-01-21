/*
 * @Date: 2018-11-10 11:20:21
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-06 16:01:08
 */

import React, { Component } from 'react';

import { Wrapper, Avatar, Logo, Menu, RouterPage, BrowserUpdate } from './core';

// logo图片和文字
import logoImg from './SSvg';

// menu配置
import menuRoutes from '@/menu.config';
// 页面配置
import pageRoutes from '@/routerPage.config';

import './styles/index.less';

// echarts主题色配置
import { sui } from '@/core/utils/echartTheme.js';
import echarts from 'echarts';
echarts.registerTheme('suiTheme', sui);

const { PageWrapper, LeftWrapper, RightWrapper, Header } = Wrapper;

// 个人中心参数使用参考
const avatarOptions = {
  // head:avatarImg,
  account: 'Zenli',
  optionLinks: [
    { iconName: 'setting', link: 'xxx.qq.com/user', linkName: '个人中心' }
  ],
  loginOutCallBack: () => {
    alert('点击了登出按钮');
  }
};

class App extends Component {
  render() {
    return (
      /*
       * 默认为 partScroll 局部（左右分别）滚动,不需传参
       * globalScroll 整体滚动,示例如下：
       * <PageWrapper layoutType="globalScroll"></PageWrapper>
       */
      <PageWrapper>
        <BrowserUpdate />
        <LeftWrapper>
          <Logo img={logoImg} text="SUI-指南" url="/" />
          {/* 使用svg logo */}
          {/* <Logo img={logoImg} text={logoText} url={'/'} /> */}
          <Menu
            menuData={menuRoutes.data}
            defaultSelectedKey={menuRoutes.defaultSelectedKey}
          />
        </LeftWrapper>
        {/* layoutType="globalScroll"时，可选择：白色背景跟随内容高度自适应 or 白色背景最小高度为窗口height的100% */}
        {/* 默认白色背景跟随内容自适应高度 */}
        {/* 白色背景最小高度为窗口height的100% 取值： <RightWrapper adaptable={true} > */}
        <RightWrapper>
          <Header>
            <Avatar {...avatarOptions} />
          </Header>
          <RouterPage
            routeData={pageRoutes}
            contentClassName="coralfish-mark"
          />
        </RightWrapper>
      </PageWrapper>
    );
  }
}

export default App;
