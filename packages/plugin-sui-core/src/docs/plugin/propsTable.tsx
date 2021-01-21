/** propsTable
 * 自动生成组件api文档
 * 参数：组件of:component, 自定义props对象
 * */

import { withMDXComponents } from '@mdx-js/tag/dist/mdx-provider';
import { get } from 'lodash/fp';
import React, { ComponentType, CSSProperties, Fragment, SFC } from 'react';
import { humanize } from '../utils/humanize-prop.ts';

export interface StylesMap {
  [s: string]: CSSProperties;
}

const styles: StylesMap = {
  thead: {
    textAlign: 'left'
  }
};

export interface EnumValue {
  value: string;
  computed: boolean;
}

export interface FlowTypeElement {
  name: string;
  value: string;
}

export interface FlowTypeArgs {
  name: string;
  type: {
    name: string;
  };
}

export interface PropType {
  name: string;
  value?: any;
  raw?: any;
  computed?: boolean;
}

export interface FlowType extends PropType {
  elements: FlowTypeElement[];
  name: string;
  raw: string;
  type?: string;
  computed?: boolean;
  signature?: {
    arguments: FlowTypeArgs[];
    return: {
      name: string;
    };
  };
}

export interface Prop {
  required: boolean;
  description?: string;
  type: PropType;
  defaultValue?: {
    value: string;
    computed: boolean;
  };
  flowType?: FlowType;
}

export type ComponentWithDocGenInfo = ComponentType & {
  __docgenInfo: {
    description?: string;
    props?: Record<string, Prop>;
  };
};

export type PropsTable = {
  of: ComponentWithDocGenInfo;
  props?: Record<
    string,
    {
      description?: string;
      required?: boolean;
      typeName: string;
      typeTip?: string;
      defaultValue?: string;
    }
  >;
  components: {
    [key: string]: ComponentType<any>;
  };
};

export type TooltipComponent = ComponentType<{
  text: React.ReactNode;
  children: React.ReactNode;
}>;

export const getPropType = (prop: Prop, Tooltip?: TooltipComponent) => {
  // 接受raw格式的自定义数据，用于书写a标签、锚点等
  if (prop.type.raw) {
    return prop.type.raw;
  }
  const propName = prop.flowType ? prop.flowType.name : prop.type.name;
  const isEnum = propName.startsWith('"') || propName === 'enum';
  const name = isEnum ? 'enum' : propName;
  const value = prop.type && prop.type.value;

  if (!name) return null;

  if (
    !Tooltip ||
    (isEnum && typeof value === 'string') ||
    (!prop.flowType && !isEnum && !value) ||
    (prop.flowType && !prop.flowType.elements)
  ) {
    return name;
  }

  return prop.flowType ? (
    <Tooltip text={humanize(prop.flowType)}>{name}</Tooltip>
  ) : (
    <Tooltip text={humanize(prop.type)}>{name}</Tooltip>
  );
};

const BasePropsTable: SFC<PropsTable> = ({
  of: component,
  props,
  components
}) => {
  const info = component.__docgenInfo;
  // defaultProps：从react组件获取到的属性
  const defaultProps = info && info.props;

  if (!info || !defaultProps) {
    return null;
  }

  const hasDescription = Object.keys(defaultProps).some((name: string) => {
    const description = get(`${name}.description`, defaultProps);

    return Boolean(description) && Boolean(get('length', description));
  });

  const Table = components.table || 'table';
  const Thead = components.thead || 'thead';
  const Tr = components.tr || 'tr';
  const Th = components.th || 'th';
  const Tbody = components.tbody || 'tbody';
  const Td = components.td || 'td';
  const Tooltip: TooltipComponent = components.tooltip;

  return (
    <Fragment>
      <Table className="PropsTable">
        <Thead style={styles.thead}>
          <Tr>
            <Th className="PropsTable--property">Property</Th>
            <Th className="PropsTable--type">Type</Th>
            <Th className="PropsTable--required">Required</Th>
            <Th className="PropsTable--default">Default</Th>
            {hasDescription && (
              <Th width="40%" className="PropsTable--description">
                Description
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {defaultProps &&
            Object.keys(defaultProps).map((name: string) => {
              const newProps = typeof props === 'function' ? props() : props;
              const prop = newProps
                ? Object.assign({}, defaultProps[name], newProps[name])
                : defaultProps[name];

              if (!prop.flowType && !prop.type) return null;
              return (
                <Tr key={name}>
                  <Td>{name}</Td>
                  <Td>{getPropType(prop, Tooltip)}</Td>
                  <Td>{String(prop.required)}</Td>
                  {!prop.defaultValue ? (
                    <Td>
                      <em>-</em>
                    </Td>
                  ) : (
                    <Td>
                      {prop.defaultValue.value === "''" ? (
                        <em>[Empty String]</em>
                      ) : (
                        prop.defaultValue &&
                        prop.defaultValue.value.replace(/\'/g, '')
                      )}
                    </Td>
                  )}
                  {hasDescription && (
                    <Td>{prop.description && prop.description}</Td>
                  )}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </Fragment>
  );
};

export const PropsTable = withMDXComponents(BasePropsTable);
