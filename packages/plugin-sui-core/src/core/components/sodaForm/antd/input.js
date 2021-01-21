/*
 * @Date: 2018-11-13 15:10:36
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-06 16:08:49
 */

import React from 'react';
import { Input, InputNumber } from 'antd';

const { TextArea } = Input;

export default payload => {
  if (payload.isNumber) {
    return <InputNumber {...(payload && payload.props)} />;
  }
  return payload.props && payload.isTextarea ? (
    <TextArea {...(payload && payload.props)} />
  ) : (
    <Input {...(payload && payload.props)} />
  );
};
