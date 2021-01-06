import 'reflect-metadata';
import { Inject as inject, Service as service } from 'typedi';
import PluginConfig from '../../plugin-config/src/index';
// import PluginWebEditor from '../../plugin-web-editor/client-core/src/index';

@service()
class CreateDream {
  @inject()
  private config: PluginConfig;

  // @Inject()
  // webEditor: PluginWebEditor;

  public async make() {
    await this.config.create();
    // await this.webEditor.create();
  }
}

export default CreateDream;
