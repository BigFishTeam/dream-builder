/*
 * @Date: 2018-11-13 17:47:31
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-01-06 16:08:53
 */

import React from 'react';
import { Radio } from 'antd';

export default (payload = {}) => {
  const { group = false, props = {} } = payload;

  if (group) {
    if (props.options) {
      return <Radio.Group {...props} />;
    }
    if (Array.isArray(payload.list)) {
      const isReactNode = payload.list.every(item =>
        React.isValidElement(item)
      );
      return (
        <Radio.Group {...props}>
          {isReactNode
            ? payload.list
            : payload.list.map((item, index) => (
                <Radio
                  key={`sui-radio-${index}`}
                  value={item.value}
                  {...item.props}
                >
                  {item.label}
                </Radio>
              ))}
        </Radio.Group>
      );
    }
  } else {
    return <Radio {...props} />;
  }
};
