// eslint-disable-next-line node/no-missing-import
import objectGet from 'lodash/get';

import defaults from './defaults.json';
import testConfig from './test.json';
import developmentConfig from './development.json';
import productionConfig from './production.json';

const env = process.env.NODE_ENV || 'development';

const envConfigMapping: {
  [env: string]: Record<string, unknown>;
} = {
  development: developmentConfig,
  production: productionConfig,
  test: testConfig,
};
const envConfig = envConfigMapping[env];

function get(path: string) {
  const value = objectGet(envConfig, path) ?? objectGet(defaults, path);
  if (value) return value;

  throw new Error(`No such config path: ${path}`);
}

export default { get };
