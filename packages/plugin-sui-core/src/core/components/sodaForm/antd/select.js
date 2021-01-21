/*
 * @Date: 2018-11-13 15:11:45
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-06 16:08:59
 */

import * as React from 'react';
import { Select } from 'antd';

export default payload => {
  if (!payload || !payload.list) {
    throw new Error('select requires list');
  }

  const { list } = payload;

  const isReactNode = list.every(item => React.isValidElement(item));

  return (
    <Select
      dropdownClassName="sui-comp-selectDropdown"
      allowClear
      style={{ minWidth: 140 }}
      {...(payload && payload.props)}
    >
      {isReactNode
        ? list
        : list.map((item, index) => (
            <Select.Option key={`sui-options-${index}`} value={item.value}>
              {item.label}
            </Select.Option>
          ))}
    </Select>
  );
};
