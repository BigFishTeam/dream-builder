/**
 * @file basicTable.js
 * @date 2019-02-26 11.21.50
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';

import './style/basicTable.less';

const propTypes = {
  /** 表格列配置描述 */
  columns: PropTypes.array,
  /** 数据源 */
  dataSource: PropTypes.array,
  /** 分页配置 */
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  /** 头部右上角帮助信息 */
  help: PropTypes.element,
  /** 表格左上角操作项 */
  actions: PropTypes.array,
  /** 是否展示table（例：页面初始化有“新建”按钮的时候，可以隐藏table） */
  showTable: PropTypes.bool
};

const defaultProps = {
  columns: [],
  dataSource: [],
  pagination: false,
  help: null,
  actions: [],
  showTable: true
};
class BasicTable extends Component {
  state = {};

  render() {
    const {
      columns,
      dataSource,
      pagination,
      help,
      actions,
      showTable,
      ...otherProps
    } = this.props;
    // 操作列表
    const actionList = actions.map(item => {
      // 直接传一个自定义组件
      const { component } = item;
      const { label } = item;
      const onClickHandle = item.doAction;
      const isPrimary = item.primary ? 'primary' : 'second';
      if (component) {
        return <>{component}</>;
      }
      return (
        <Button
          key={label}
          className={isPrimary}
          type={isPrimary}
          onClick={() => onClickHandle()}
        >
          {label}
        </Button>
      );

      /* eslint-enable */
    });
    return (
      <div className="sui-table">
        {actions.length || help ? (
          <div className="sui-table-header">
            <div className="sui-table-action">{actionList}</div>
            <div className="sui-table-title">{help}</div>
          </div>
        ) : null}
        {showTable ? (
          <Table
            pagination={pagination}
            columns={columns}
            dataSource={dataSource}
            size="middle"
            {...otherProps}
          />
        ) : (
          ''
        )}
      </div>
    );
  }
}

BasicTable.propTypes = propTypes;
BasicTable.defaultProps = defaultProps;
export default BasicTable;
