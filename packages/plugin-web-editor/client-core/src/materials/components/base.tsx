import React, { Component } from 'react';
import { getMetaInfo } from '../index';
import { GlobalContext } from '../../context/global';
import Ajax from '../../core/request';
import AstParser from '../../core/ast';

export class BaseMaterial<P = {}, S = {}> extends Component<P, S> {
  static contextType = GlobalContext;
  constructor(props: any) {
    super(props);
    this.render = () => this.instantiate(this.safeParse((this.props as any).createProps));
  }

  componentDidMount() {
    (this.constructor as any).afterInstantiate();
  }

  getRouterConfig() {
    const astTool: AstParser = this.context.astTool;
    return astTool.getPageList();
  }

  getMaterialConfig() {
    return Reflect.getMetadata('config', this.constructor);
  }

  mapConfigToTarget() {
    return getMetaInfo(this.constructor);
  }

  getAjax() {
    return Ajax;
  }

  // 用于动态操纵
  addItem() {}

  // 同样是用于动态操纵
  deleteItem() {}

  private safeParse(string: string) {
    try {
      const result = JSON.parse(string);
      return result;
    } catch {
      return {};
    }
  }

  static async beforeInstantiate(): Promise<any> {}

  static async afterInstantiate(): Promise<any> {}

  instantiate(createProps?: any): any {}
}
