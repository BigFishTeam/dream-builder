/*
 * @Date: 2018-11-23 16:40:14
 * @Last Modified time: 2021-01-06 16:00:43
 */

const path = require('path');

const DeployPush = require('deploy-http-push');

DeployPush({
  receiver: 'http://10.209.7.31/white/deploy/receiver',
  to: '/home/sui/site', // 官网存放路径
  targetDir: path.resolve(__dirname, '..', 'build'), // 本地资源路径
  headers: {
    Host: 'sui.webdev.com'
  }
});
