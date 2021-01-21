# Form

> 表单生成引擎

## 示例

```javascript
import { SodaForm } from 'sui-components';

<SodaForm
  layout="inline"
  resetBtn
  submitBtnText="查询"
  config={config}
  onChange={this.onChangeHandle}
  onSubmit={this.onSubmitHandle}
  onReset={this.onResetHandle}
/>;
```

## 配置项

### Form Params

| 参数            | 说明           | 类型                    | 默认值         |
| --------------- | -------------- | ----------------------- | -------------- |
| `className`     | 自定义 class   | `string`                | `''`           |
| `layout`        | 布局           | `'horizontal'|'inline'` | `'horizontal'` |
| `disabled`      | 禁用           | `boolean`               | `false`        |
| `config`        | 配置项         | `array`                 | `[]`           |
| `labelWidth`    | 标签宽度       | `number`                | `80`           |
| `operatorBtns`  | 操作按钮       | `boolean`               | `true`         |
| `btnSpan`       | 操作按钮 span  | `number`                | `6`            |
| `submitBtnText` | 提交按钮文案   | `string`                | `提交`         |
| `resetBtn`      | 重置按钮       | `boolean`               | `false`        |
| `resetBtnText`  | 重置按钮文案   | `string`                | `重置`         |
| `validator`     | 是否校检       | `boolean`               | `false`        |
| `formLayout`    | 表单布局       | `object`                | `null`         |
| `onSubmit`      | 提交事件       | `function`              | `() => {}`     |
| `onReset`       | 重置事件       | `function`              | `() => {}`     |
| `onChange`      | 表单值变化事件 | `function`              | `() => {}`     |
| `onValidate`    | 校检事件       | `function`              | `() => {}`     |

### Config Params

| 参数            | 说明           | 类型                                                   | 默认值          |
| --------------- | -------------- | ------------------------------------------------------ | --------------- |
| `type`          | 表单类型       | `'input'|'select'| 'date'|'checkbox'|'radio'|'upload'` | `''`            |
| `label`         | 标签           | `string`                                               | `null`          |
| `span`          | 宽度           | `number`                                               | `24`            |
| `prop`          | 属性名         | `string`                                               | `null`          |
| `required`      | 是否必填       | `boolean`                                              | `false`         |
| `initialValue`  | 默认值         | `any`                                                  | `null`          |
| `help`          | 提示语         | `string`                                               | `null`          |
| `message`       | 校检失败文案   | `string`                                               | `null`          |
| `payload`       | 表单负荷       | `object`                                               | `{ props: {} }` |
| `className`     | 自定义类名     | `string`                                               | `null`          |
| `render`        | 自定义组件     | `function`                                             | `null`          |
| `disabled`      | 是否禁用       | `boolean`                                              | `false`         |
| `visible`       | 是否可见       | `boolean`                                              | `true`          |
| `validatorRule` | 自定义校检逻辑 | `array`                                                | `null`          |
