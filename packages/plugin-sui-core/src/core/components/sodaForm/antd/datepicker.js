/*
 * @Date: 2018-11-13 16:47:31
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-06 16:08:44
 */

import React from 'react';
import { DatePicker } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class MonthRangePicker extends React.Component {
  state = {
    mode: ['month', 'month'],
    value: []
  };

  handlePanelChange = (value, mode) => {
    this.setState({
      value,
      mode: [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1]
      ]
    });
    this.props.onChange(value);
  };

  render() {
    const { value, mode } = this.state;
    return (
      <RangePicker
        placeholder={['Start month', 'End month']}
        format="YYYY-MM"
        value={value}
        mode={mode}
        {...this.props}
        onPanelChange={this.handlePanelChange}
      />
    );
  }
}

const mapper = {
  date: DatePicker,
  week: WeekPicker,
  month: MonthPicker,
  range: RangePicker,
  rangeMonth: MonthRangePicker
};

const com = payload => {
  const { dateType = 'date' } = payload;
  const Component = mapper[dateType];
  return <Component {...(payload && payload.props)} />;
};

export default com;
