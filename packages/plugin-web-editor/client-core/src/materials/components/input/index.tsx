import React from 'react';
import 'reflect-metadata';
import { Input } from 'antd';
import { BaseMaterial } from '../base';
import { Icon, Desc, IsLayout, Material, NodeDC, Config } from '../../decorators';

@Icon(require('../../../imgs/input.png'), 'src')
@Desc('这个是input物料')
@IsLayout(false)
@Material()
@NodeDC(1)
export default class InputMaterial extends BaseMaterial<{
  value: string;
  onClick: any;
  onChange?: any;
}> {
  constructor(props: any) {
    super(props);
  }

  @Config()
  private value = '';

  @Config()
  private onChange = () => {};

  static async beforeInstantiate() {
    return {
      a: 1,
      b: 2,
    };
  }

  static async afterInstantiate() {
    return;
  }

  instantiate(createProps?: any) {
    return (
      <Input
        value={this.props.value}
        onClick={this.props.onClick}
        onChange={e => {
          e.persist();
          this.props.onChange(e) as any;
        }}
      />
    );
  }
}
