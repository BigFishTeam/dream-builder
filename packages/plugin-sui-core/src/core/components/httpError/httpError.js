/**
 * @file index.js
 * @date 2018-12-20 14.25.05
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style/httpError.less';

const propTypes = {
  /*
   * 页面错误状态码 必传值
   * 可填参数 '403' '404 '500'
   * */
  /** 页面错误状态码; 参数：403/404/500等 */
  errorCode: PropTypes.string.isRequired
};

const errorText = {
  403: '抱歉，你无法访问该页面',
  404: '抱歉，你访问的页面不存在',
  500: '抱歉，服务器出错了'
};
class HttpError extends Component {
  state = {};
  render() {
    const { errorCode } = this.props;
    let text = errorText[errorCode];
    let errorCodeSvg = errorCode;
    if (errorCode > 500 && errorCode < 600) {
      text = errorText[500];
      errorCodeSvg = 500;
    }
    return (
      <div className="sui-httperror">
        <div className="code">{errorCode}</div>
        <div className="text">{text}</div>
        <img
          src={`http://mat1.gtimg.com/www/coral/sui-assets/images/httpError${errorCodeSvg}.svg`}
          alt=""
        />
      </div>
    );
  }
}

HttpError.propTypes = propTypes;
export default HttpError;
