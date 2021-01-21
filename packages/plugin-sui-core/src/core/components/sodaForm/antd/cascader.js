/*
 * @Date: 2018-12-28 16:11:18
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-06 16:08:34
 */

import React from 'react';
import { Cascader } from 'antd';

export default (payload = {}) => {
  const { props } = payload;
  return <Cascader {...props} />;
};
