import React, { Component } from 'react';
import SodaButton from '@/core/components/button';
const { SodaButtonGroup } = SodaButton;

class SodaButtonGroupDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedType: ''
    };
  }

  handleClick = value => {
    console.log('changed:', value);
    // 更新组件选择状态
    this.setState({
      selectedType: value
    });
  };

  render() {
    const btnGroupConfig = [
      {
        type: 'pass',
        value: 'pass',
        label: '通过',
        icon: 'check'
      },
      {
        type: 'warn',
        value: 'warn',
        label: '不确定',
        icon: 'question'
      },
      {
        type: 'delete',
        value: 'delete',
        label: '删除',
        icon: 'close'
      }
    ];
    return (
      <SodaButtonGroup
        config={btnGroupConfig}
        onChange={this.handleClick}
        defaultValue="pass"
      />
    );
  }
}

export default SodaButtonGroupDemo;
