'use strict';
import React from 'react';
import renderer from 'react-test-renderer';

const PluginConfig = require('../../plugin-config/src/index');
const PluginWebEditor = require('../../plugin-web-editor/src/index');
const { Config } = require('../../types/base');

test('create-dream', async () => {
  const config = await new PluginConfig().create();
  expect(config).toBe(Config);
  const webEditor = await new PluginWebEditor().create();
  const component = renderer.create(webEditor);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
