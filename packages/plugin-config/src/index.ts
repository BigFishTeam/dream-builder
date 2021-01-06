import { Service as service } from 'typedi';
import { IPlugin } from '../../types/base';

@service()
class PluginConfig implements IPlugin {
  create() {
    return new Promise<object>((resolve, reject) => {
      // create config
      const config = {};
      resolve(config);
    });
  }
}

export default PluginConfig;
