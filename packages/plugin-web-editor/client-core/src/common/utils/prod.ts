import _ from 'lodash';

const isProd = function() {
  return _.get(window, 'gg.config.isProd', false);
};

const setProd = function(state: boolean): void {
  _.set(window, 'gg.config.isProd', state);
};

/**
 * 获取项目ID，存储在localstorage里
 */
const getProjectId = function() {
  return 'gg-test';
};

export { isProd, setProd, getProjectId };
