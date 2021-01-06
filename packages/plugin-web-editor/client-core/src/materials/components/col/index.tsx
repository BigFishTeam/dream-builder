import React from 'react';
import { BaseMaterial } from '../base';
import { Col } from 'antd';
import { Material, Icon, Desc, IsLayout, NodeDC, Config } from '../../decorators';

@Icon(require('../../../imgs/col.png'), 'src')
@Desc(`这个是col布局物料`)
@IsLayout(true, 100)
@NodeDC(1)
@Material()
class ColMaterial extends BaseMaterial {
  constructor(props: any) {
    super(props);
  }

  @Config()
  private col = null;

  @Config()
  private span = null;

  componentDidUpdate() {
    console.log(this.props);
  }

  instantiate() {
    return (
      <div
        style={{
          minHeight: 20,
        }}>
        {this.props.children}
      </div>
    );
  }
}

export default ColMaterial;
