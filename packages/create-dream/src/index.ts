#!/usr/bin/env node
import { Container } from 'typedi';
import * as path from 'path';
import * as fs from 'fs-extra';
import CreateDream from './create';

const pkgContent = fs.readJSONSync(path.join(__dirname, '..', 'package.json'));
console.log('create-dream version:', pkgContent.version);

(async function () {
  const dreamBuilder = Container.get(CreateDream);
  await dreamBuilder.make();
})();
