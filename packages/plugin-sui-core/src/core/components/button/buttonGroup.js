/**
 * @file buttonGroup.js
 * @date 2019-05-27 20.10.29
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import './style/buttonGroup.less';

const ButtonGroup = Button.Group;

class SodaButtonGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: ''
    };
  }

  componentDidMount() {
    if (
      this.props.defaultValue &&
      typeof this.props.defaultValue === 'string'
    ) {
      this.handleClick(this.props.defaultValue);
      const defaultButton = this[`button-${this.props.defaultValue}`];
      defaultButton.focus();
    }
  }

  // 处理点击button事件
  handleClick = value => {
    this.props.onChange(value);
    this.setState({
      active: value
    });
  };

  render() {
    const { config } = this.props;
    const btnGroup = config.map(item => {
      const btnType = item.type;
      return (
        <Button
          ref={node =>
            // eslint-disable-next-line
            (this[`button-${item.value}`] = ReactDOM.findDOMNode(node))
          }
          key={item.type + item.value}
          className={`sui-btn sui-btn-${btnType} ${
            this.state.active === item.value ? 'active' : ''
          }`}
          icon={item.icon}
          onClick={this.handleClick.bind(this, item.value)}
          value={item.value}
        >
          {item.label}
        </Button>
      );
    });
    return <ButtonGroup>{btnGroup}</ButtonGroup>;
  }
}

export default SodaButtonGroup;
