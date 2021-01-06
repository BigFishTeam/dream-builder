import React from 'react';
import 'reflect-metadata';
import { Menu } from 'antd';
import { BaseMaterial } from '../base';
import { Icon, Desc, IsLayout, Material, NodeDC, Config } from '../../decorators';

const { SubMenu } = Menu;

@Icon(require('../../../imgs/menu.png'), 'src')
@Desc('这个是menu物料')
@IsLayout(false)
@Material()
@NodeDC(1)
export default class MenuMaterial extends BaseMaterial<
  {},
  {
    routers: any;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      routers: [],
    };
  }

  componentDidMount() {
    this.setState({
      routers: this.getRouterConfig(),
    });
  }

  @Config()
  private value = '';

  @Config()
  private onChange = () => {};

  instantiate() {
    return (
      <Menu>
        {this.state.routers.map((router: any) => {
          return <SubMenu title={router.name} />;
        })}
      </Menu>
    );
  }
}
