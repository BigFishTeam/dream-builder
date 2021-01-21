/**
 * @file index.js
 * @date 2019-07-25 10.25.37
 */

import React, { Component } from 'react';
import { Alert } from 'antd';
import PropTypes from 'prop-types';

import './style/timeOut.less';

const propTypes = {
  /** 倒计时时间*/
  time: PropTypes.number.isRequired,
  /** 倒计时警告时间*/
  warningTime: PropTypes.number,
  /** 倒计时结束触发回调*/
  onTimeOut: PropTypes.func,
  /** 倒计时结束Alert文字*/
  timeoutMessage: PropTypes.string,
  /** 内部文字*/
  innerText: '超时回库'
};
const defaultProps = {
  time: 600,
  warningTime: 60,
  timeoutMessage: '太久未操作了,数据已回库~~~',
  innerText: '超时回库'
};

let suiTimer = '';

class TimeOut extends Component {
  state = {
    timeout: 0, // 0未超时，1到了警告时间，2已超时
    timer: '00:00:00'
  };

  componentDidMount() {
    this.getClock();
  }

  componentWillUnmount() {
    window.clearInterval(suiTimer);
  }

  getClock() {
    const _this = this;
    const { warningTime } = this.props;
    let clock = this.props.time;
    this.setState({
      timeout: 0, // 0未超时，1到了警告时间，2已超时
      timer: '00:00:00'
    });
    window.clearInterval(suiTimer);
    suiTimer = setInterval(() => {
      clock -= 1;
      const hour = Math.floor(clock / 3600);
      const minute = Math.floor((clock - 3600 * Math.floor(clock / 3600)) / 60);
      const second = clock % 60;
      this.setState({
        timer: `${(hour > 0 ? `${hour}:` : '') +
          (minute > 9 ? minute : `0${minute}`)}:${
          second > 9 ? second : `0${second}`
        }`
      });
      if (clock <= 0) {
        _this.setState({ timeout: 2 });
        window.clearInterval(suiTimer);
        if (_this.props.onTimeOut) {
          _this.props.onTimeOut();
        }
      } else if (warningTime && clock <= warningTime) {
        _this.setState({ timeout: 1 });
      }
    }, 1000);
  }
  render() {
    const { timeoutMessage, innerText } = this.props;
    return (
      <div className="sui-time-out">
        {this.state.timeout === 2 ? (
          <Alert message={timeoutMessage} type="error" showIcon />
        ) : (
          <div
            className={this.state.timeout === 1 ? 'timer red' : 'timer'}
            style={{ display: this.props.warningTime ? 'block' : 'none' }}
          >
            <span>{innerText}</span>
            <span className="timeText">{this.state.timer}</span>
          </div>
        )}
      </div>
    );
  }
}

TimeOut.propTypes = propTypes;
TimeOut.defaultProps = defaultProps;
export default TimeOut;
