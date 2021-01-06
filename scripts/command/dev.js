/* eslint-disable @typescript-eslint/no-require-imports */
const webpack = require('webpack');
const chalk = require('chalk');

const compiler = webpack({});

compiler.watch(
  {
    aggregateTimeout: 300,
    poll: undefined,
  },
  (err, stats) => {
    if (err) {
      console.log(chalk.red(stats.toString()));
    }
  },
);
