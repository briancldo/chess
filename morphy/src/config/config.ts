import objectGet from 'lodash/get';
import { DevError } from '../utils/errors';

import defaults from './defaults.json';
import developmentConfig from './development.json';
import productionConfig from './production.json';
import testConfig from './test.json';
import e2eConfig from './e2e.json';

type Environment = typeof process.env.NODE_ENV | 'e2e';
const env: Environment = process.env.REACT_APP_E2E
  ? 'e2e'
  : process.env.NODE_ENV;

const envConfigMapping: {
  [env in Environment]: Record<string, unknown>;
} = {
  development: developmentConfig,
  production: productionConfig,
  test: testConfig,
  e2e: e2eConfig,
};
const envConfig = envConfigMapping[env];

function get(path: string) {
  const value = objectGet(envConfig, path) ?? objectGet(defaults, path);
  if (value) return value;

  throw new DevError(`No such config path: ${path}`);
}

export default {
  get,
  environment: env,
};
