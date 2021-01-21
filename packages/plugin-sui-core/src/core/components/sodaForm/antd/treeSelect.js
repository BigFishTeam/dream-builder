/*
 * @Date: 2019-02-22 17:23:41
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-06 16:09:20
 */

import React from 'react';
import { TreeSelect } from 'antd';

export default (payload = {}) => {
  const { props } = payload;
  return <TreeSelect {...props} />;
};
