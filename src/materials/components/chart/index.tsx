import React from 'react';
import 'reflect-metadata';
import { Table } from 'antd';
import { BaseMaterial } from '../base';
import { Icon, Desc, IsLayout, Material, NodeDC, Config } from '../../decorators';

@Icon(require('../../../imgs/chart.png'), 'src')
@Desc('这个是chart物料')
@IsLayout(false)
@Material()
@NodeDC(1)
export default class ChartMaterial extends BaseMaterial {
  constructor(props: any) {
    super(props);
  }

  static async beforeInstantiate() {}

  @Config()
  private value = '';

  @Config()
  private onChange = () => {};

  instantiate(createProps?: any) {
    return <Table />;
  }
}
