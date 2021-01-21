/*
 * @Author: zenli
 * @Date: 2018-12-12 17:31:59
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-08-26 16:17:55
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Button } from 'antd';

import './style/waitCheck.less';

const propTypes = {
  /** 待审量 */
  waitNum: PropTypes.number.isRequired,
  /** 待审量字段的文本 */
  waitNumLabel: PropTypes.string,
  /** 已拉取未审核量（前次操作拉取的数据未审核并且因为意外或者人为因素尚未回库的数据量） */
  unCheckNum: PropTypes.number,
  /** 已拉取未审核的文本 */
  unCheckNumLabel: PropTypes.string,
  /** 开始审核按钮的文本 */
  startCheckLabel: PropTypes.string,
  /** 是否展示loading态 */
  loading: PropTypes.bool,
  /** 按钮是否可用 */
  disabled: PropTypes.bool,
  /** 开始审核的回调函数 */
  onStartCheck: PropTypes.func.isRequired,
  /** 是否展示“暂无字段” */
  showNoData: PropTypes.bool,
  /** 暂无字段的文案 */
  noDataLabel: PropTypes.string
};
const defaultProps = {
  waitNum: 0,
  loading: false,
  disabled: false,
  showNoData: false
};
class WaitCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClickDebouce = debounce(this.onStartCheck, 500);
  }

  onStartCheck = () => {
    console.log('开始审核触发');
    const { onStartCheck } = this.props;
    if (onStartCheck) onStartCheck();
  };

  render() {
    const {
      waitNum,
      unCheckNum,
      loading,
      disabled,
      waitNumLabel,
      unCheckNumLabel,
      startCheckLabel,
      showNoData,
      noDataLabel
    } = this.props;
    return (
      <div className="sui-wait-check">
        <div className="wait-check-positon">
          <div className="wait-num">
            {waitNumLabel || '待审量：'}
            {waitNum}
          </div>
          {unCheckNum ? (
            <div className="uncheck-num">
              {unCheckNumLabel || '已拉取未审核：'}
              {unCheckNum}
            </div>
          ) : (
            ''
          )}
          <Button
            type="primary"
            size="large"
            onClick={this.handleClickDebouce}
            loading={loading}
            disabled={disabled}
            className="wait-check-btn"
          >
            {startCheckLabel || '开始审核'}
          </Button>
          {showNoData && (
            <div className="no-data">
              <span className="sui-nothing">{noDataLabel || '暂无数据'}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

WaitCheck.propTypes = propTypes;
WaitCheck.defaultProps = defaultProps;
export default WaitCheck;
