/**
 * @file index.js
 * @date 2020-07-27 17:02:01
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import jsonp from 'jsonp';
import { Select } from 'antd';

const { Option } = Select;

const propTypes = {
  /** 绑定的值 */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  /** 获取控件的值 */
  onChange: PropTypes.func,
  /** 延迟搜索时间 */
  timeout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** value值是否格式化 true为省略中文名 false为默认 */
  format: PropTypes.bool,
  /** 是否限制单选模式按列表选择项输入表单 */
  restrictWrite: PropTypes.bool
};

const defaultProps = {
  allowClear: true,
  timeout: 300,
  notFoundContent: null,
  showArrow: false,
  format: true,
  restrictWrite: false
};

let searchTimeOut = null;
const SearchRTX = props => {
  const defaultValue = !props.mode ? undefined : [];
  const [selectValue, setSelectValue] = useState(defaultValue);
  const [rtxUserList, setRtxUserList] = useState([]);
  const { width, value, timeout, format, restrictWrite, ...otherProps } = props;

  useEffect(() => {
    setSelectValue(value === '' ? undefined : value);
    if (value === undefined || value.length === 0) {
      setRtxUserList([]);
    }
  }, [value]);

  // 请求RTX列表
  const searchRtxList = name =>
    new Promise((resolve, reject) => {
      try {
        jsonp(
          `https://hrc.oa.com/v1.1/pages/chooser/data/staff.aspx?q=${name}`,
          { timeout: 5000 },
          (err, data) => {
            if (err) {
              reject(new Error('error'));
            } else {
              resolve(data);
            }
          }
        );
      } catch (err) {
        reject(new Error('error'));
      }
    });

  // 设置控件值
  const setValue = value => {
    props.onChange && props.onChange(value);
    setSelectValue(value);
  };

  // 表单输入时
  const onSearch = value => {
    if (value.length === 0) {
      return;
    }
    getRtxList(value);
    if (!props.mode && !restrictWrite) {
      setValue(value);
    }
  };

  const onChange = value => {
    setValue(value);
  };

  // 获取rtx名称列表
  const getRtxList = value => {
    // 设置延时执行防止重复请求接口
    clearTimeout(searchTimeOut);
    searchTimeOut = setTimeout(async () => {
      const data = await searchRtxList(value);
      setRtxUserList(data);
    }, Number(timeout));
  };

  // option列表
  const options = rtxUserList.map(item => {
    // 是否格式化
    const label = format ? item.Name.replace(/\(.*?\)/g, '') : item.Name;
    return (
      <Option key={label} label={item.Name}>
        {item.Name}
      </Option>
    );
  });
  return (
    <Select
      showSearch
      value={selectValue}
      onSearch={onSearch}
      onChange={onChange}
      {...otherProps}
    >
      {options}
    </Select>
  );
};

SearchRTX.propTypes = propTypes;
SearchRTX.defaultProps = defaultProps;

export default SearchRTX;
