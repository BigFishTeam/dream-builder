import React, { Component } from 'react';
import TimeOut from '@/core/components/timeOut';
import { message } from 'antd';

class SodaTimeOutDemo extends Component {
  render() {
    return (
      <TimeOut
        time={20}
        warningTime={5}
        onTimeOut={() => {
          message.warning('时间到了');
        }}
        timeoutMessage={'提示文案'}
      ></TimeOut>
    );
  }
}

export default SodaTimeOutDemo;
