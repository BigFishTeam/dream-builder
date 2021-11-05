export function Icon(iconName: string): (constructor: Function) => any;
export function Icon(iconName: string, iconMode: 'src'): (constructor: Function) => any;
export function Icon(iconName: string, iconMode?: 'src') {
  return function(constructor: Function) {
    Reflect.defineMetadata('icon', iconName, constructor);
    if (iconMode === 'src') {
      Reflect.defineMetadata('iconMode', 'src', constructor);
    }
  };
}

export function Desc(desc: string) {
  return function(constructor: Function) {
    Reflect.defineMetadata('desc', desc, constructor);
  };
}

export function IsLayout(isLayoutNode: boolean): any;
export function IsLayout(isLayoutNode: boolean, layoutCapacity: number): any;
export function IsLayout(isLayoutNode: boolean, layoutCapacity?: number) {
  return function(constructor: Function) {
    if (isLayoutNode && layoutCapacity) {
      Reflect.defineMetadata('layoutCapacity', layoutCapacity, constructor);
    }
    Reflect.defineMetadata('isLayoutNode', isLayoutNode, constructor);
  };
}

export function Material() {
  return function(constructor: Function) {
    const type = constructor.name.replace('Material', '');
    Reflect.defineMetadata('type', type, constructor);
  };
}

export function NodeDC(dc: number) {
  return function(constructor: Function) {
    Reflect.defineMetadata('nodeDemandCapacity', dc, constructor);
  };
}

type SelectGroupType = {
  key: string;
  desc: string;
};

// TODO: config装饰器的设计
export function Config(): any;
export function Config(selectGroup: SelectGroupType[]): any;
export function Config(selectGroup?: SelectGroupType[]) {
  return function(target: any, propertyName: string) {
    const prevConfig = Reflect.getMetadata('config', target.constructor) || [];
    const option = {
      name: propertyName,
    } as {
      name: string;
      selectGroup?: SelectGroupType[];
    };
    if (selectGroup) {
      selectGroup.forEach(selectConfig => {
        if (!option.selectGroup) {
          option.selectGroup = [];
        }
        option.selectGroup.push(selectConfig);
      });
    }
    const nextConfig = [...prevConfig, option];
    Reflect.defineMetadata('config', nextConfig, target.constructor);
  };
}

export function LifeCircle() {}
