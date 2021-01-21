/*
 * @Date: 2018-12-14 14:48:40
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-06 16:09:29
 */

import React from 'react';
import { Upload, Button } from 'antd';

export default (payload = {}) => {
  const { children, props, btnText = 'Upload' } = payload;
  return (
    <Upload {...props}>
      {children ? children() : <Button type="primary">{btnText}</Button>}
    </Upload>
  );
};
