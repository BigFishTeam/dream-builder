import React from 'react';
import 'reflect-metadata';
import { Card } from 'antd';
import { BaseMaterial } from '../base';
import { Icon, Desc, IsLayout, Material, NodeDC, Config } from '../../decorators';

@Icon(require('../../../imgs/card.png'), 'src')
@Desc('这个是card物料')
@IsLayout(true, 24)
@Material()
@NodeDC(1)
export default class CardMaterial extends BaseMaterial {
  constructor(props: any) {
    super(props);
  }

  @Config()
  private title = null;

  instantiate() {
    return <Card {...this.props}>{this.props.children}</Card>;
  }
}
