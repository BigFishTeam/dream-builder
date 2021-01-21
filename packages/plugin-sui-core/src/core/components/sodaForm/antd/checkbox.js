/*
 * @Date: 2018-11-13 17:43:07
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-06 16:08:39
 */

import React from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

export default (payload = {}) => {
  const { group = false, props = {} } = payload;

  return group ? <CheckboxGroup {...props} /> : <Checkbox {...props} />;
};
