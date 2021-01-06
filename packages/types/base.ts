export interface IPlugin {
  create(): Promise<object>
}

export interface IConfig {
  baseConfig: object;
  webEditorConfig: object;
}