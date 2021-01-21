import 'reflect-metadata';
import { Inject as inject, Service as service } from 'typedi';
import PluginConfig from '../../plugin-config/src/index';
import PluginWebEditor from '../../plugin-web-editor/index';
import PluginSuiCore from '../../plugin-sui-core/src';
import PluginReactTemplate from '../../plugin-react-template';

@service()
class CreateDream {
  @inject()
  private config: PluginConfig;

  @inject()
  webEditor: PluginWebEditor;

  @inject()
  suiCore: PluginSuiCore;

  @inject()
  reactTemplate: PluginReactTemplate;

  public async make() {
    const config = await this.config.create();
    await this.webEditor.create(config);
  }
}

export default CreateDream;
