import { Service as service } from 'typedi';
import { IPlugin } from '../../types/base';
import baseConfig from './base.config';

@service()
class PluginConfig implements IPlugin {
  create() {
    return new Promise<object>((resolve, reject) => {
      // 当前userConfig为空对象，后续扩展
      const userConfig: object = {};
      const config = Object.assign(baseConfig, userConfig);
      resolve(config);
    });
  }
}

export default PluginConfig;
