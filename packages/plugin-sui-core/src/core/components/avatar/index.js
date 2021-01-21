/**
 * @file index.js
 * @date 2018-11-13 16.28.00
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'sui-icons/lib/head';
import { Menu, Dropdown, Icon } from 'antd';

import './style/index.less';

const propTypes = {
  /** 用户头像url地址 */
  head: PropTypes.string,
  /** 用户账号：oa账号、qq号、昵称 */
  account: PropTypes.string,
  /** 操作的跳转链接；例：个人中心链接、系统设置链接等 [{iconName:'setting',link:'xxx.qq.com/user',linkName:'个人中心'}] */
  optionLinks: PropTypes.array,
  /** 点击登出按钮的回调函数 */
  loginOutCallBack: PropTypes.func,
  showName: PropTypes.bool
};
const defaultProps = {
  head: '',
  account: '',
  optionLinks: [],
  showName: false
};
class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loginOut = e => {
    e.preventDefault();
    const { loginOutCallBack } = this.props;
    if (loginOutCallBack) loginOutCallBack();
  };

  buildHead() {
    const { head, account, showName } = this.props;
    const isLogin = !!(head || account);
    let HeadComp;
    if (isLogin) {
      if (head) {
        HeadComp = <img className="avatar-head" src={head} alt="" />;
      } else {
        HeadComp = (
          <span className="head-icon-default head-icon-login">
            <Icon component={Head} />
          </span>
        );
      }
    } else {
      HeadComp = (
        <span className="head-icon-default head-icon-unlogin">
          <Icon component={Head} />
        </span>
      );
    }
    if (showName) {
      return (
        <span className="head-wrapper">
          {HeadComp}
          <span className="head-name">{account}</span>
        </span>
      );
    }
    return HeadComp;
  }

  render() {
    const { account, optionLinks } = this.props;
    // 记录组件的登录态
    // 头像和账号都不传的话则是未登录
    const menu = (
      <Menu className="sui-avatar-pop">
        <Menu.Item className="sui-avatar-pop-nick" disabled>
          <Icon type="smile" />
          <span>{account}</span>
        </Menu.Item>
        {optionLinks.length > 0 &&
          optionLinks.map(option => (
            <Menu.Item key={option.link}>
              <a target="_blank" rel="noopener noreferrer" href={option.link}>
                <Icon type={option.iconName || 'setting'} />
                <span>{option.linkName}</span>
              </a>
            </Menu.Item>
          ))}
        <Menu.Item>
          <a
            className="sui-avatar-pop-loginout"
            href=" "
            onClick={e => {
              this.loginOut(e);
            }}
          >
            <Icon type="logout" />
            <span>登出</span>
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="sui-avatar">
        <Dropdown overlay={menu} placement="bottomCenter">
          {this.buildHead()}
        </Dropdown>
      </div>
    );
  }
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;
export default Avatar;
