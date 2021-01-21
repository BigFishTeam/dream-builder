/*
 * 浏览器更新提示
 * @Author: shywang
 * @Date: 2019-01-02 15:32:50
 * @Last Modified by: shywang
 * @Last Modified time: 2019-01-04 16:03:33
 */

import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import './style/index.less';

const propTypes = {
  /** chrome浏览器最低版本 */
  version: PropTypes.number
};

const defaultProps = {
  version: 60
};

// 判断是否为chrome浏览器，是返回浏览器版本，不是返回0
const isChrome = () => {
  const ua = navigator.userAgent.toLowerCase();

  // 先排除Edge和QQ浏览器
  if (/edge|qqbrowser/.test(ua)) {
    return 0;
  }

  let result = 0;
  const regExp = /chrome[ |/]([\w.]+)/;
  const match = regExp.exec(ua);

  if (match) {
    const version = match[1].split('.')[0];
    result = parseInt(version, 10);
  }

  return result;
};

// 下载chrome提示
const DownloadChrome = () => (
  <Fragment>
    为获得更好的使用体验，请
    <a
      href="https://www.google.cn/chrome/"
      target="_blank"
      rel="noopener noreferrer"
    >
      下载Chrome浏览器
    </a>
    ！
  </Fragment>
);

// 升级chrome 提示
const UpdateChrome = () => (
  <Fragment>
    您的Chrome版本过低，请点击右上角菜单更新或
    <a
      href="https://www.google.cn/chrome/"
      target="_blank"
      rel="noopener noreferrer"
    >
      下载最新版本
    </a>
    ！
  </Fragment>
);

class BrowserUpdate extends Component {
  componentDidMount() {
    const currentVersion = isChrome();
    const { version } = this.props;

    if (currentVersion !== 0 && currentVersion >= version) {
      return;
    }

    const div = document.createElement('div');
    div.className = 'sui-browserUpdate';
    document.body.insertAdjacentElement('afterBegin', div);

    if (currentVersion === 0) {
      render(<DownloadChrome />, div);
    } else {
      render(<UpdateChrome />, div);
    }
  }

  render() {
    return null;
  }
}

BrowserUpdate.propTypes = propTypes;
BrowserUpdate.defaultProps = defaultProps;
export default BrowserUpdate;
