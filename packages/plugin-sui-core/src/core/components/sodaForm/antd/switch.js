/*
 * @Date: 2018-12-28 16:11:18
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-06 16:09:09
 */

import React from 'react';
import { Switch } from 'antd';

export default (payload = {}) => {
  const { props = {} } = payload;
  return <Switch {...props} />;
};
