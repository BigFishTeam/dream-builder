import React from 'react';
import 'reflect-metadata';
import { Button } from 'antd';
import { BaseMaterial } from '../base';
import { Icon, Desc, IsLayout, Material, NodeDC, Config } from '../../decorators';

@Icon(require('../../../imgs/button.png'), 'src')
@Desc('这个是button物料')
@IsLayout(false)
@Material()
@NodeDC(1)
export default class ButtonMaterial extends BaseMaterial {
  constructor(props: any) {
    super(props);
  }

  @Config()
  private value = '';

  @Config()
  private text = '';

  @Config()
  private onClick = () => {};

  instantiate() {
    return <Button {...this.props}>{(this.props as any).text}</Button>;
  }
}
